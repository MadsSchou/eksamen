export default function handler(req, res) {
  fetch("https://charm-pale-tub.glitch.me/bands")
    .then((res) => res.json())
    .then((data) => {
      const fetchImageUrl = (image) => {
        if (image && image.logo && !image.logo.startsWith("https")) {
          // Perform the logic to fetch the image URL based on the image ID or other criteria
          // Replace the placeholder with the actual image URL
          return `https://charm-pale-tub.glitch.me/logos/${image.logo}`;
        }

        // Return the original URL if it's already a valid URL
        return image.logo;
      };

      const updatedImages = data?.map((image) => ({
        ...image,
        logo: fetchImageUrl(image),
      }));

      res.status(200).json(updatedImages);
    });
}
