import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Playlist {
  id: number;
  name: string;
  description: string;
  trackCount: number;
  icon: string;
  gradient: string;
}

interface PlaylistSectionProps {
  playlists: Playlist[];
  onPlaylistClick: (playlistId: number) => void;
}

export default function PlaylistSection({ playlists, onPlaylistClick }: PlaylistSectionProps) {
  return (
    <section className="mb-12">
      <h2 className="text-2xl md:text-3xl font-bold mb-6">Плейлисты и подборки</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {playlists.map((playlist) => (
          <Card
            key={playlist.id}
            onClick={() => onPlaylistClick(playlist.id)}
            className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-[1.03] bg-card/50 backdrop-blur border-border/50"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${playlist.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
            <div className="relative p-6 flex items-start gap-4">
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${playlist.gradient} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{playlist.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                  {playlist.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {playlist.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Music" size={14} />
                  <span>{playlist.trackCount} треков</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
