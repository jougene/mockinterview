const getPreviewFromVideoLink = (videoLink) => {
  if (videoLink && videoLink.includes('youtu.be')) {
    const videoId = new URL(videoLink).pathname
    return `https://img.youtube.com/vi${videoId}/0.jpg`
  }
  return 'unknown'
}

module.exports = {
  getPreviewFromVideoLink
}
