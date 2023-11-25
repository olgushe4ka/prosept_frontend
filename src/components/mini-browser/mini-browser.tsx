import { SetStateAction, useEffect, useState } from "react";

const MiniBrowser = ({ initialUrl }: { initialUrl: string }) => {
  const [url, setUrl] = useState(initialUrl);

  useEffect(() => {
    console.log("MiniBrowser received new URL:", initialUrl);
    setUrl(initialUrl); // Update the url state when initialUrl changes
  }, [initialUrl]);

  const handleUrlChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setUrl(event.target.value);
  };

  return (
    <div>
      <input type="text" value={url} onChange={handleUrlChange} />
      <iframe title="browser" src={url} width="100%" height="500px" />
    </div>
  );
};

export default MiniBrowser;
