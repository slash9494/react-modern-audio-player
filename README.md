## Override Style

### Icon Imgs
use icon module - `react-icons`
- pass by props `iconImgs`

### ID
- rs-audio-player-audio 

### classnames
- playlist classnames
  - play-list-trigger-container
  - sortable-play-list-content-container (root)
    - sortable-list
      - list-item-root
        - list-item-container
          - album-cover-wrapper
          - album-info-wrapper
      - list-item-root dragstart
      - list-item-root dragover

- interface classnames
  - interface-container
    - interface-grid

### color variables
- --rs-audio-player-volume-fill
- --rs-audio-player-volume-track
- --rs-audio-player-volume-thumb
- --rs-audio-player-volume-background
- --rs-audio-player-volume-panel-background
- --rs-audio-player-volume-panel-border
- --rs-audio-player-track-current-time-color
- --rs-audio-player-track-duration-color
- --rs-audio-player-progress-color
- --rs-audio-player-selected-list-item-background

## UI Placement

## flexible and customable UI
it can offer variant UI and you can also place each component easily
`Volume Tooltip` is wrapped with `tooltip` of `react-spectrum`

### Theme mode
it apply color-theme from `system-theme` 
and you can customize color-theme from `css-variable` of `theme-default` of `react-spectrum`  

### grid item custom area
progress = 2-4
playBtn = 2-4
repeatBtn = row1-4 / 2 / row1-4 / 10
