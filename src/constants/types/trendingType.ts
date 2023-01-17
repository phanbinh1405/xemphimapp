export interface TrendingItem {
	adult: boolean;
	backdropPath: string;
	id: number;
	name?: string;
	originalLanguage: string;
	originalName: string;
	overview: string;
	posterPath: string;
	mediaType: 'movie' | 'tv';
	genreIds: number[];
	popularity: number;
	firstAirDate?: string;
	voteAverage: number;
	voteCount: number;
	originCountry?: string[];
	releaseDate?: string;
	title?: string;
	originalTitle?:string;
	video?: boolean;
}