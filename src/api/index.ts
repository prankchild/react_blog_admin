function importAll(modules: any) {
  const apiList: any = {};
  for (const key in modules) {
    const res = modules[key];
    for (const k in res) {
      apiList[k] = res[k];
    }
  }

  return apiList;
}

export default importAll(import.meta.globEager('./*.api.ts'));
