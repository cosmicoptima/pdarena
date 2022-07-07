import { fetchApi, Result, apiUrl } from '@innexgo/frontend-common'

export type TournamentSubmissionKind =
  "COMPETE" |
  "VALIDATE" |
  "TESTCASE" |
  "CANCEL";

export type Submission = {
  submissionId: number,
  creationTime: number,
  creatorUserId: number,
  code: string,
}

export type Tournament = {
  tournamentId: number,
  creationTime: number,
  creatorUserId: number,
}

export type TournamentData = {
  tournamentDataId: number,
  creationTime: number,
  creatorUserId: number,
  tournament: Tournament,
  title: string,
  description: string,
  active: boolean,
}

export type TournamentSubmission = {
  tournamentSubmissionId: number,
  creationTime: number,
  creatorUserId: number,
  tournament: Tournament,
  submissionId: number,
  kind: TournamentSubmissionKind,
}

export type MatchResolution = {
  matchResolutionId: number,
  creationTime: number,
  submissionId: number,
  opponentSubmissionId: number,
  round: number,
  defected?: boolean,
  stdout: string,
  stderr: string,
}

export const AppErrorCodes = [
  "NO_CAPABILITY",
  "SUBMISSION_NONEXISTENT",
  "TOURNAMENT_NONEXISTENT",
  "SUBMISSION_TOO_LONG",
  "TOURNAMENT_SUBMISSION_NOT_VALIDATED",
  "TOURNAMENT_SUBMISSION_TESTCASE_FAILS",
  "DECODE_ERROR",
  "INTERNAL_SERVER_ERROR",
  "METHOD_NOT_ALLOWED",
  "UNAUTHORIZED",
  "BAD_REQUEST",
  "NOT_FOUND",
  "NETWORK",
  "UNKNOWN",
] as const;

// Creates a union export type
export type AppErrorCode = typeof AppErrorCodes[number];

async function fetchApiOrNetworkError<T>(url: string, props: object): Promise<Result<T, AppErrorCode>> {
  try {
    const [code, resp] = await fetchApi(url, props);
    if (code >= 200 && code < 300) {
      return { Ok: resp }
    } else {
      return { Err: resp }
    }
  } catch (_) {
    return { Err: "NETWORK" };
  }
}

const undefToStr = (s: string | undefined) =>
  s === undefined ? apiUrl() : s

export type SubmissionNewProps = {
  code: string,
  apiKey: string,
}

export function submissionNew(props: SubmissionNewProps, server?: string): Promise<Result<Submission, AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/submission/new", props);
}


export type TournamentNewProps = {
  title: string,
  description: string,
  apiKey: string,
}

export function tournamentNew(props: TournamentNewProps, server?: string): Promise<Result<TournamentData, AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/tournament/new", props);
}

export type TournamentDataNewProps = {
  tournamentId: number,
  title: string,
  description: string,
  active: boolean,
  apiKey: string,
}

export function tournamentDataNew(props: TournamentDataNewProps, server?: string): Promise<Result<TournamentData, AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/tournament_data/new", props);
}


export type TournamentSubmissionNewProps = {
  tournamentId: number,
  submissionId: number,
  active: boolean,
  kind: TournamentSubmissionKind,
  apiKey: string,
}

export function tournamentSubmissionNew(props: TournamentSubmissionNewProps, server?: string): Promise<Result<TournamentSubmission, AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/tournament_submission/new", props);
}

export type SubmissionViewProps = {
  submissionId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  apiKey: string,
}

export function submissionView(props: SubmissionViewProps, server?: string): Promise<Result<Submission[], AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/submission/view", props);
}


export type TournamentDataViewProps = {
  tournamentDataId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  tournamentId?: number[],
  title?: string[],
  active?: boolean,
  onlyRecent: boolean,
  apiKey: string,
}

export function tournamentDataView(props: TournamentDataViewProps, server?: string): Promise<Result<TournamentData[], AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/tournament_data/view", props);
}

export type TournamentSubmissionViewProps = {
  tournamentSubmissionId?: number[],
  minCreationTime?: number,
  maxCreationTime?: number,
  creatorUserId?: number[],
  tournamentId?: number[],
  submissionId?: number[],
  kind?: TournamentSubmissionKind,
  onlyRecent: boolean,
  apiKey: string,
}

export function tournamentSubmissionView(props: TournamentSubmissionViewProps, server?: string): Promise<Result<TournamentSubmission[], AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/tournament_submission/view", props);
}



export type MatchResolutionViewProps = {
  minCreationTime?: number,
  maxCreationTime?: number,
  matchResolutionId?: number[],
  creatorUserId?: number[],
  submissionId?: number[],
  opponentSubmissionId?: number[],
  round?: number[],
  apiKey: string,
}

export function matchResolutionView(props: MatchResolutionViewProps, server?: string): Promise<Result<MatchResolution[], AppErrorCode>> {
  return fetchApiOrNetworkError(undefToStr(server) + "/pdarena/match_resolution/view", props);
}



