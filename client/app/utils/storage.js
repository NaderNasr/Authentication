export function getFromStorage(key) {
  if(!key){
    return null;
  }

  try {
    const valStr = localStorage.getItem(key)
    if(valStr){
      return JSON.parse(valStr)
    }
    return null;
  } catch (e) {
    return null;
  }
}

export function setInStorage(key, obj) {
  if(!key){
    console.error('No Key Detected')
  }
  try {
    localStorage.setItem(key, JSON.stringify(obj))
  } catch (e) {

    console.error(e)

  } finally {

  }
}
