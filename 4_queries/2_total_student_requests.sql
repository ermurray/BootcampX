SELECT students.name AS student_name, count(assistance_requests.*) AS total_assistances
FROM students
JOIN assistance_requests ON student_id = students.id
GROUP BY student_name
HAVING students.name = 'Elliot Dickinson';
