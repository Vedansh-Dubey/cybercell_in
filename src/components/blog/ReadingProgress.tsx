import { useReadingProgress } from '../../hooks/useReadingProgress'

export function ReadingProgress() {
  const progress = useReadingProgress()

  return (
    <div
      className="reading-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Reading progress"
      style={{ width: `${progress}%` }}
    />
  )
}
