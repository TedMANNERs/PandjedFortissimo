/* EXTENSIONS */
CREATE EXTENSION "uuid-ossp";

/* TABLES */
CREATE TABLE track (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL,
  "filepath" TEXT NOT NULL
);

CREATE TABLE tag (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "name" TEXT NOT NULL
);

CREATE TABLE track_tag (
  "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  "track_id" UUID REFERENCES track(id),
  "tag_id" UUID REFERENCES tag(id)
);
