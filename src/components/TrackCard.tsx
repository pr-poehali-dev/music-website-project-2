import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  genre: string;
  rating: number;
  coverUrl: string;
}

interface TrackCardProps {
  track: Track;
  isPlaying?: boolean;
  onPlay: () => void;
  onRatingChange: (rating: number) => void;
}

export default function TrackCard({ track, isPlaying, onPlay, onRatingChange }: TrackCardProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStarClick = (rating: number) => {
    onRatingChange(rating);
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur border-border/50">
      <div className="flex items-center gap-4 p-4">
        <div className="relative flex-shrink-0">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-gradient-to-br from-primary to-secondary">
            <img src={track.coverUrl} alt={track.title} className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-lg">
            <Button
              variant="ghost"
              size="icon"
              onClick={onPlay}
              className="bg-primary/90 hover:bg-primary text-primary-foreground w-10 h-10 rounded-full"
            >
              <Icon name={isPlaying ? 'Pause' : 'Play'} size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-base md:text-lg truncate group-hover:text-primary transition-colors">
            {track.title}
          </h3>
          <p className="text-sm text-muted-foreground truncate">{track.artist}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
              {track.genre}
            </span>
            <span className="text-xs text-muted-foreground">{formatDuration(track.duration)}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => setHoveredStar(star)}
                onMouseLeave={() => setHoveredStar(null)}
                className="transition-all hover:scale-110"
              >
                <Icon
                  name="Star"
                  size={16}
                  className={`transition-colors ${
                    star <= (hoveredStar || track.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="text-xs text-muted-foreground">
            {track.rating > 0 ? `${track.rating}/5` : 'Нет оценок'}
          </div>
        </div>
      </div>
    </Card>
  );
}
