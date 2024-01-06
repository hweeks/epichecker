import {SpawnOptions, spawnSync} from 'child_process'

export const convertVideoToImages = (videoPath: string, outputImagePath: string, timeSig = '00:00:20') => {
  const cmdOpts: SpawnOptions = {
    env: {
      ...process.env
    },
    shell: true,
  }
  const args = ['-ss', timeSig, '-i', `"${videoPath}"`, '-frames:v', '1', `"${outputImagePath}"`];
  let spawnOuter;
  try {
    spawnOuter = spawnSync('ffmpeg', args, cmdOpts)
  } catch (error) {
    spawnOuter = null
  }
  return spawnOuter
}

