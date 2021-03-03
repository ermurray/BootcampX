SELECT teachers.name AS name, count(assistance_requests.*) AS total_assistances
  FROM teachers
  JOIN assistance_requests ON teacher_id = teachers.id
  GROUP BY name
  HAVING name = 'Waylon Boehm';