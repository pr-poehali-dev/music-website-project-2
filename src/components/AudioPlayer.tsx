import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  genre: string;
  rating: number;
  coverUrl: string;
}

interface AudioPlayerProps {
  track: Track | null;
  onNext?: () => void;
  onPrevious?: () => void;
}

export default function AudioPlayer({ track, onNext, onPrevious }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (track) {
      setIsPlaying(false);
      setCurrentTime(0);
    }
  }, [track]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value[0]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!track) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 text-muted-foreground">
          <Icon name="Music" size={24} />
          <p>Выберите трек для воспроизведения</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-xl border-t border-border p-4 md:p-6 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-secondary flex-shrink-0">
              <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold truncate">{track.title}</h4>
              <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2 flex-[2] min-w-0">
            <div className="flex items-center gap-2 md:gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={onPrevious}
                className="hover:text-primary hidden md:flex"
              >
                <Icon name="SkipBack" size={20} />
              </Button>
              <Button
                variant="default"
                size="icon"
                onClick={togglePlay}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary hover:bg-primary/90"
              >
                <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onNext}
                className="hover:text-primary hidden md:flex"
              >
                <Icon name="SkipForward" size={20} />
              </Button>
            </div>
            <div className="hidden md:flex items-center gap-3 w-full max-w-md">
              <span className="text-xs text-muted-foreground tabular-nums">{formatTime(currentTime)}</span>
              <Slider
                value={[currentTime]}
                max={track.duration}
                step={1}
                onValueChange={handleTimeChange}
                className="flex-1"
              />
              <span className="text-xs text-muted-foreground tabular-nums">{formatTime(track.duration)}</span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-3 w-32">
            <Icon name="Volume2" size={18} className="text-muted-foreground" />
            <Slider
              value={[volume]}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
