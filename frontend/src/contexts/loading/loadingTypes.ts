import { CommonState } from '../types';

export interface IVideo {
  vid_track?: boolean;
}

export interface LoadingState extends CommonState {
  payload: IVideo;
  loading: boolean;
}
