SELECT students.name AS student, AVG(assignment_submissions.duration) AS average_assisgnment_duration
  FROM students
  JOIN assignment_submissions ON student_id = students.id
  WHERE end_date IS NULL
  GROUP BY student
  ORDER BY average_assisgnment_duration DESC;