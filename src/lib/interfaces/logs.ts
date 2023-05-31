/// <reference types="@sveltejs/kit" />


/**
 * Activity data about the action performed in it.
 * Actions: create, modify data, validate, invalidate
 * 
 * - `professor`: The user who performed the action
 * - `date`
 * - `time`
 */
export interface ActivityActionLog {
  user: string;
  date: Date;
  time: Date;
};
