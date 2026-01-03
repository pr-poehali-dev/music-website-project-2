import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import AudioPlayer from '@/components/AudioPlayer';
import TrackCard from '@/components/TrackCard';
import PlaylistSection from '@/components/PlaylistSection';

interface Track {
  id: number;
  title: string;
  artist: string;
  duration: number;
  genre: string;
  rating: number;
  coverUrl: string;
}

interface Playlist {
  id: number;
  name: string;
  description: string;
  trackCount: number;
  icon: string;
  gradient: string;
}

const mockTracks: Track[] = [
  {
    id: 1,
    title: 'Midnight Dreams',
    artist: 'Luna Eclipse',
    duration: 245,
    genre: 'Electronic',
    rating: 5,
    coverUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop',
  },
  {
    id: 2,
    title: 'Summer Breeze',
    artist: 'Ocean Waves',
    duration: 198,
    genre: 'Chill',
    rating: 4,
    coverUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
  },
  {
    id: 3,
    title: 'City Lights',
    artist: 'Urban Sound',
    duration: 223,
    genre: 'Pop',
    rating: 5,
    coverUrl: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop',
  },
  {
    id: 4,
    title: 'Mountain Echo',
    artist: 'Nature Soul',
    duration: 267,
    genre: 'Ambient',
    rating: 4,
    coverUrl: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop',
  },
  {
    id: 5,
    title: 'Electric Pulse',
    artist: 'Neon Nights',
    duration: 189,
    genre: 'Electronic',
    rating: 5,
    coverUrl: 'https://images.unsplash.com/photo-1471478331149-c72f17e33c73?w=400&h=400&fit=crop',
  },
  {
    id: 6,
    title: 'Acoustic Journey',
    artist: 'String Theory',
    duration: 256,
    genre: 'Acoustic',
    rating: 3,
    coverUrl: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400&h=400&fit=crop',
  },
];

const mockPlaylists: Playlist[] = [
  {
    id: 1,
    name: 'Вечерний чилл',
    description: 'Расслабляющая музыка для спокойного вечера',
    trackCount: 24,
    icon: '🌙',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    name: 'Энергия утра',
    description: 'Заряд бодрости на весь день',
    trackCount: 18,
    icon: '☀️',
    gradient: 'from-orange-500 to-yellow-500',
  },
  {
    id: 3,
    name: 'Фокус и концентрация',
    description: 'Музыка для продуктивной работы',
    trackCount: 32,
    icon: '🎯',
    gradient: 'from-blue-500 to-cyan-500',
  },
];

export default function Index() {
  const [tracks, setTracks] = useState<Track[]>(mockTracks);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('Все');

  const genres = ['Все', ...Array.from(new Set(tracks.map((t) => t.genre)))];

  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre === 'Все' || track.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
  };

  const handleRatingChange = (trackId: number, newRating: number) => {
    setTracks((prev) =>
      prev.map((track) => (track.id === trackId ? { ...track, rating: newRating } : track))
    );
  };

  const handleNext = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const nextTrack = tracks[(currentIndex + 1) % tracks.length];
    setCurrentTrack(nextTrack);
  };

  const handlePrevious = () => {
    if (!currentTrack) return;
    const currentIndex = tracks.findIndex((t) => t.id === currentTrack.id);
    const prevTrack = tracks[(currentIndex - 1 + tracks.length) % tracks.length];
    setCurrentTrack(prevTrack);
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Music" size={24} className="text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold">MusicHub</h1>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Icon name="User" size={22} />
            </Button>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Icon
                name="Search"
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Поиск по названию или исполнителю..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card/50 border-border/50"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={selectedGenre === genre ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedGenre(genre)}
                  className="whitespace-nowrap"
                >
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <PlaylistSection
          playlists={mockPlaylists}
          onPlaylistClick={(id) => console.log('Playlist clicked:', id)}
        />

        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold">Каталог треков</h2>
            <div className="text-sm text-muted-foreground">
              {filteredTracks.length} {filteredTracks.length === 1 ? 'трек' : 'треков'}
            </div>
          </div>
          <div className="space-y-3">
            {filteredTracks.map((track) => (
              <TrackCard
                key={track.id}
                track={track}
                isPlaying={currentTrack?.id === track.id}
                onPlay={() => handlePlay(track)}
                onRatingChange={(rating) => handleRatingChange(track.id, rating)}
              />
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Об авторе</h2>
          <div className="bg-card/50 backdrop-blur border border-border/50 rounded-xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary flex-shrink-0 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop"
                  alt="Автор"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Александр Музыкантов</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Композитор и продюсер с 10-летним опытом создания музыки. Специализируюсь на
                  электронной музыке, эмбиенте и саундтреках. Моя миссия — создавать музыку,
                  которая вдохновляет и помогает людям находить свой ритм жизни.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Mail" size={16} />
                    Связаться
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Globe" size={16} />
                    Веб-сайт
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Icon name="Instagram" size={16} />
                    Instagram
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <AudioPlayer track={currentTrack} onNext={handleNext} onPrevious={handlePrevious} />
    </div>
  );
}
