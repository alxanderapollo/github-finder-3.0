import React from "react";

function About() {
  return (
    <div>
      <h1 className="text-6xl mb-4">
        {" "}
        <h1 className="text-6xl mb-4" data-cy="headerTitle">
          Github Finder
        </h1>
        <p className="mb-4 text-2xl font-light" data-cy="siteDescription">
          A React app to search GitHub profiles and see profile details.
        </p>
        <p className="text-lg text-gray-400" data-cy="webVersion">
          Version{" "}
          <span className="text-white" data-cy="versionNum">
            1.0.0
          </span>
        </p>
      </h1>
    </div>
  );
}

export default About;
