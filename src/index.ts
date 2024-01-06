import {readdirSync, mkdirSync, rmSync} from 'fs'
import {join, resolve} from 'path'
import { convertVideoToImages } from './cmd-utils';
import { offsetByShow, seasonOffset } from './fudger';

export interface EpisodeInfo {
  season: number;
  episode: number;
  title: string
  fileName: string;
}

const gimmeAFileAndTheIWillTellYouAllAboutItProbably = (rootDir: string) => (fileName: string): EpisodeInfo | null => {
  const possibleMatches = fileName.split(' - ')
  const match = possibleMatches.find(v => v[0] === 'S' && v[3] === 'E')

  if (!match) return null;

  const season = parseInt(match.substring(1,3));
  const episode = parseInt(match.substring(4,6));
  return {
    title: possibleMatches[2],
    season,
    episode,
    fileName: resolve(rootDir, fileName)
  };
};

const lookIntoADirectoryAndFetchSomeData = async (rootDir: string, showName: string) => {
  const seasons = readdirSync(rootDir).filter(p => !p.includes('.'))
  const outputDir = resolve(__dirname, '..', 'intros', showName)
  const episodes: EpisodeInfo[][] = await seasons.map((season) => {
    const baseDir = join(rootDir, season)
    const allEps = readdirSync(baseDir)
    return allEps.map(gimmeAFileAndTheIWillTellYouAllAboutItProbably(baseDir)).filter(Boolean) as EpisodeInfo[]
  })

  for (let seasonOfEpisodses of episodes) {
    const finalDir = `${outputDir}/season-${seasonOfEpisodses[0].season}`
    try {
      rmSync(finalDir, { recursive: true })
    } catch (error) {
      console.log('no dir')
    }
    mkdirSync(finalDir)
    for (let episode of seasonOfEpisodses) {
      try {
        const writeTo = resolve(finalDir, `S${episode.season}-E${episode.episode}.png`)
        let timeOffset = '00:00:14.555'
        const trueSeason = episode.season
        if (episode.season >= 13) {
          timeOffset = '00:00:13.555'
        }
        let seasonOffsetActual = offsetByShow[showName] ?? seasonOffset
        if (seasonOffsetActual[trueSeason] && seasonOffsetActual[trueSeason][episode.episode]) {
          timeOffset = seasonOffsetActual[trueSeason][episode.episode]
          if (timeOffset === 'no') {
            continue
          }
        }
        convertVideoToImages(episode.fileName, writeTo, timeOffset)
      } catch (error) {
        console.log(`S${episode.season}-E${episode.episode}.png ERROR`)
      }
    }   
    console.log('finished up season', seasonOfEpisodses[0].season)
  }
}

lookIntoADirectoryAndFetchSomeData(
  '/Volumes/datalake/tv/Bob\'s Burgers',
  'bobs burgers'
)