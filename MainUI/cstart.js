import concurrently from 'concurrently';

concurrently([
  { command: 'python C:/Users/DELL/Desktop/Flaskapp/Flask-server/app.py', name: 'python', prefixColor: 'bgRed.white' },
  { command: 'npm run dev', name: 'npm', prefixColor: 'bgBlue.white' },
]).catch((err) => {
  console.error('Error:', err);
});
