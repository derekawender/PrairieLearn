CREATE TABLE IF NOT EXISTS users (
    id BIGSERIAL PRIMARY KEY,
    uid text UNIQUE NOT NULL,
    uin char(9) UNIQUE,
    name text
);

DROP VIEW IF EXISTS student_assessment_scores CASCADE;
DROP VIEW IF EXISTS user_assessment_scores CASCADE;
DROP MATERIALIZED VIEW IF EXISTS user_assessment_durations CASCADE;
DROP VIEW IF EXISTS assessment_instance_durations CASCADE;

ALTER TABLE users ALTER COLUMN id SET DATA TYPE BIGINT;
ALTER TABLE users ALTER COLUMN uid SET DATA TYPE TEXT;
ALTER TABLE users ALTER COLUMN name SET DATA TYPE TEXT;

ALTER TABLE users ALTER COLUMN uid SET NOT NULL;
