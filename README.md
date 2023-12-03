# gws-smartchips-github
This is a Google Apps Script add-on that makes Smartchips in Google Workspace compatible with GitHub.

https://developers.google.com/workspace/add-ons/guides/preview-links-smart-chips

![CleanShot 2023-12-04 at 08 25 30](https://github.com/howdy39/gws-smartchips-github/assets/6329532/4b206685-94e6-4c61-9256-745a4b89ccdb)


## Tech Stack
- [google/clasp](https://github.com/google/clasp)
- [rollup](https://rollupjs.org/)
- [TypeScript](http://www.typescriptlang.org/)
- [ESLint](https://github.com/eslint/eslint)
- [Prettier](https://prettier.io/)
- [Jest](https://facebook.github.io/jest/)

## Prerequisites
- [Node.js](https://nodejs.org/)
- [google/clasp](https://github.com/google/clasp)

## Getting Started
### Clone the repository
```
git clone --depth=1 https://github.com/howdy39/gas-clasp-starter.git <project_name>
cd <project_name>
rm -Rf .git
```

### Install dependencies
```
npm install
```

### Configuration
#### Open `.clasp.json`, change scriptId
What is scriptId ? https://github.com/google/clasp#scriptid-required
```
{
  "scriptId": <your_script_id>,
  "rootDir": "dist"
}
```

#### Open `.package.json`, change properties
The name, version, description, and homepage properties are output as comments at the beginning of the output GAS.

```
...
  "name": "your application name",
  "version": "your application version",
  "description": "your application description",
  "homepage" "your repository url"
...
```

#### Open `src/appsscript.json`, change timeZone (optional)
[Apps Script Manifests](https://developers.google.com/apps-script/concepts/manifests)
```
{
  "timeZone": "Asia/Tokyo", ## Change timeZone
  ...
}
```


### Development and build project
```
npm run build
```

### Push
```
clasp push
```


## License
This software is released under the MIT License, see LICENSE.txt.
