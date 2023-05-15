export default function handler(req, res) {
  fetch("http://localhost:8080/bands")
    .then((res) => res.json())
    .then((data) => {
      res.status(200).json(data);
    });
}
