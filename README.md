## Дев режим

```bash
yarn install

yarn dev
```

## Прод режим

```bash
yarn install
yarn build
docker build -t sit-test .
docker run -d -p 1234:80 sit-test
```
