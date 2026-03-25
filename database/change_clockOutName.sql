-- Active: 1772408486739@@127.0.0.1@3306@restauranttestdb
ALTER TABLE timeclock_entries
  CHANGE COLUMN clockOUT clockOutTmp DATETIME NULL;

ALTER TABLE timeclock_entries
  CHANGE COLUMN clockOutTmp clockOut DATETIME NULL;