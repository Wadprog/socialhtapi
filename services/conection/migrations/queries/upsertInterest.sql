INSERT INTO "interests" 
("id","name","created_at")
  VALUES (?, ?, current_timestamp, current_timestamp)
  ON CONFLICT("name") DO NOTHING RETURNING id;