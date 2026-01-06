import React from 'react';
import './Skills.css';

interface SkillCategory {
  title: string;
  skills: {
    name: string;
    iconUrl: string;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: [
      { name: 'Python', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'JavaScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'TypeScript', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Go', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original.svg' },
      { name: 'Solidity', iconUrl: 'https://raw.githubusercontent.com/devicons/devicon/master/icons/solidity/solidity-original.svg' },
      { name: 'Java', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'C', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    ],
  },
  {
    title: 'Web & Blockchain',
    skills: [
      { name: 'React', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Django', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
      { name: 'Hardhat', iconUrl: 'https://raw.githubusercontent.com/NomicFoundation/hardhat/main/packages/hardhat-core/assets/hardhat-logo.svg' },
      { name: 'Truffle', iconUrl: 'https://raw.githubusercontent.com/trufflesuite/truffle/main/packages/core/lib/assets/logo.svg' },
      { name: 'Remix', iconUrl: 'https://raw.githubusercontent.com/ethereum/remix-project/master/libs/remix-ide/src/assets/img/remix-logo.svg' },
      { name: 'Web3.js', iconUrl: 'https://raw.githubusercontent.com/web3/web3.js/main/assets/logo/web3js.svg' },
      { name: 'Ethers.js', iconUrl: 'https://raw.githubusercontent.com/ethers-io/ethers.js/main/packages/ethers/svg/ethers.svg' },
      { name: 'OpenZeppelin', iconUrl: 'https://raw.githubusercontent.com/OpenZeppelin/openzeppelin-contracts/master/docs/assets/openzeppelin.svg' },
      { name: 'LayerZero', iconUrl: 'https://raw.githubusercontent.com/LayerZero-Labs/LayerZero/main/packages/oft/images/layerzero-logo.svg' },
    ],
  },
  {
    title: 'Data & Databases',
    skills: [
      { name: 'Pandas', iconUrl: 'https://cdn.simpleicons.org/pandas/150458' },
      { name: 'NumPy', iconUrl: 'https://cdn.simpleicons.org/numpy/013243' },
      { name: 'Matplotlib', iconUrl: 'https://raw.githubusercontent.com/matplotlib/matplotlib/main/doc/_static/logo2_compressed.svg' },
      { name: 'Dune Analytics', iconUrl: 'https://dune.com/favicon.ico' },
      { name: 'BigQuery', iconUrl: 'https://cdn.simpleicons.org/googlebigquery/4285F4' },
      { name: 'MySQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
      { name: 'PostgreSQL', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
      { name: 'MongoDB', iconUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
    ],
  },
];

const Skills: React.FC = () => {
  return (
    <section className="skills section">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <div className="skills-grid">
          {skillCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="skill-category">
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-item">
                    <div className="skill-icon-wrapper">
                      <img
                        src={skill.iconUrl}
                        alt={skill.name}
                        className="skill-icon"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'flex';
                        }}
                      />
                      <div className="skill-icon-fallback" style={{ display: 'none' }}>
                        {skill.name.charAt(0)}
                      </div>
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
