.PHONY: run resume install

run: install
    bun run/src/index.ts

resume: install
    bun run/src/index.ts --resume

install:
    cd run && bun install --frozen-lockfile 2>/dev/null; cd ..