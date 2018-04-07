export default {
  data () {
    return {
    }
  },

  computed: {
  },

  created () {
  },

  mounted () {
    this.sendGtagEventTracking()
  },

  methods: {
    /*
      Desc: 使用 gtag.js 进行事件跟踪(通过 JS + DOM);
      Date: 2018-03-04
    */
    sendGtagEventTracking () {
      const bindEventListener = (elem) => {
        const gtagAction = elem.dataset.action
        const gtagCategory = elem.dataset.category
        const gtagLabel = elem.dataset.label

        if (gtagAction && gtagCategory && gtagLabel) {
          elem.onclick = () => {
            const gtag = window.gtag || (() => {})
            gtag('event', gtagAction, {
              'event_category': gtagCategory,
              'event_label': gtagLabel
            })
          }
        }
      }

      const gtagTrackList = document.querySelectorAll('.gtag-track')
      ;[].forEach.call(gtagTrackList, bindEventListener, false)
    }
  }
}
