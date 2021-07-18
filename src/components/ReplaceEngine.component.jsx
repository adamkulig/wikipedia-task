import React, { useState } from "react";
import { Input, Button } from "antd";

const ReplaceEngine = ({ onReplace, onReplaceAll }) => {
  const [replaceWith, setReplaceWith] = useState("");
  return (
    <div>
      <Input
        className="input"
        placeholder="replace with"
        type="text"
        onChange={(e) => setReplaceWith(e.target.value)}
        value={replaceWith}
      />

      <Button
        type="primary"
        className="button"
        onClick={() => onReplace(replaceWith)}
      >
        Replace
      </Button>
      <Button
        type="primary"
        className="button"
        onClick={() => onReplaceAll(replaceWith)}
      >
        Replace all
      </Button>
    </div>
  );
};

export default ReplaceEngine;
