(function(){
    var script = {
 "mouseWheelEnabled": true,
 "start": "this.init(); this.syncPlaylists([this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C_playlist,this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist,this.mainPlayList]); this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C_playlist.set('selectedIndex', 0); this.playList_AE8B53D5_B83A_D81F_41E0_643F4AB043B9.set('selectedIndex', 0)",
 "horizontalAlign": "left",
 "children": [
  "this.MainViewer",
  "this.Container_BD97D3E3_B35B_337B_41D2_122E80886A12",
  "this.Container_BC0FE789_B359_D3B6_41D3_D9E53B4D1D06",
  "this.Container_BC08CB49_B34B_DCB6_41E6_4FE442812364",
  "this.Container_BDD81119_B34F_2CC9_41E0_C7FE83317472"
 ],
 "id": "rootPlayer",
 "scrollBarMargin": 2,
 "scripts": {
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "unregisterKey": function(key){  delete window[key]; },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "registerKey": function(key, value){  window[key] = value; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "existsKey": function(key){  return key in window; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "getKey": function(key){  return window[key]; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } }
 },
 "verticalAlign": "top",
 "paddingRight": 0,
 "defaultVRPointer": "laser",
 "paddingLeft": 0,
 "downloadEnabled": false,
 "width": "100%",
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Player",
 "contentOpaque": false,
 "minHeight": 20,
 "propagateClick": false,
 "minWidth": 20,
 "borderSize": 0,
 "definitions": [{
 "label": "Female Toilet (5)",
 "hfovMin": "120%",
 "id": "panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1",
   "yaw": -85.11,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -103.45
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_B39AB54D_A49D_0B1D_41E1_655AE73C0D6F"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "x": 633.55,
   "class": "PanoramaMapLocation",
   "y": 1636.36,
   "angle": -93.56
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 94.21,
  "class": "PanoramaCameraPosition",
  "pitch": -13.82
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 26,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -10.49,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "panorama_A919A752_A37F_08D7_41E3_AD725415E551_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 177.29,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 4.27,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -14.82,
    "yawSpeed": 64.22,
    "pitchSpeed": 32.46,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 92.83,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -17.02,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_ACE83566_B83A_D83A_41E5_ABB300D59EFB"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 91.44,
  "class": "PanoramaCameraPosition",
  "pitch": -6.53
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A91FA387_A37F_083D_41D3_095D0D14132F_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 94.21,
  "class": "PanoramaCameraPosition",
  "pitch": -10.05
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -159.09,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AF22C4F0_B83A_D816_41A2_04DF7AA96C28"
},
{
 "initialZoomFactor": 1,
 "fieldOfViewOverlayRadiusScale": 0.3,
 "id": "map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
 "width": 2599,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8.jpeg",
    "width": 2599,
    "class": "ImageResourceLevel",
    "height": 2147
   },
   {
    "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_lq.jpeg",
    "width": 281,
    "tags": "preload",
    "class": "ImageResourceLevel",
    "height": 233
   }
  ]
 },
 "overlays": [
  "this.overlay_ACBF63AB_A387_0846_41D0_0F8CEF906FE1",
  "this.overlay_B345115F_A38F_08E9_41D1_BAD4832DB703",
  "this.overlay_B0965908_A38D_F87C_41BF_11CB4005B64B",
  "this.overlay_B14AA3C5_A387_0FF6_41DB_2960DAD2569B",
  "this.overlay_8CFEDF8C_A483_16BF_41D6_1D20B9B421A2",
  "this.overlay_A55D71B1_A889_3FB6_41E4_BEE33529F063"
 ],
 "fieldOfViewOverlayInsideColor": "#FFFFFF",
 "label": "Floor Plan 3D",
 "minimumZoomFactor": 0.5,
 "fieldOfViewOverlayOutsideColor": "#000000",
 "fieldOfViewOverlayInsideOpacity": 0.4,
 "thumbnailUrl": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_t.jpg",
 "scaleMode": "fit_inside",
 "fieldOfViewOverlayOutsideOpacity": 0,
 "class": "Map",
 "maximumZoomFactor": 1.2,
 "height": 2147
},
{
 "label": "Female Toilet (2)",
 "hfovMin": "120%",
 "id": "panorama_A91FA387_A37F_083D_41D3_095D0D14132F",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38"
  },
  {
   "panorama": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F",
   "yaw": -32.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -87.87
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_B1009C61_A3BD_389B_41E0_2A213889AA07",
  "this.overlay_B33040EE_A483_0908_41DD_93899A273745"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_t.jpg",
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "label": "Entrance (2)",
 "hfovMin": "120%",
 "id": "panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551",
   "yaw": 79.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -83.1
  },
  {
   "panorama": "this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21",
   "yaw": 177.17,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 92.76
  },
  {
   "panorama": "this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21",
   "yaw": -3.96,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 92.76
  },
  {
   "panorama": "this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F",
   "yaw": -87.87,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -32.87
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_AD6939C4_A383_7838_41E3_FF5EBD769A12",
  "this.overlay_AC890E78_A39D_18C8_41D1_CD1EACE740B9",
  "this.overlay_AC293B44_A39D_1839_41C8_B39736FB12E9",
  "this.overlay_BC9079C6_A483_1B18_41DD_E59CAFA6180A"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "x": 1470.16,
   "class": "PanoramaMapLocation",
   "y": 974.41,
   "angle": 271.36
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 93.96,
  "class": "PanoramaCameraPosition",
  "pitch": -19.6
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_camera"
},
{
 "label": "Female Toilet (1)",
 "hfovMin": "120%",
 "id": "panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F"
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_B11897C0_A3BD_1795_41DF_C19B2187414A",
  "this.overlay_B3194FCB_A48D_1709_41E0_3763049924FE"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "x": 1491.26,
   "class": "PanoramaMapLocation",
   "y": 1767.88,
   "angle": 86.65
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 76.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_ACE1353E_B83A_D80D_41CE_9AB3C59001BC"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 92.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AD4FB63E_B83A_D80A_4196_8182E6FDBE7A"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 94.71,
  "class": "PanoramaCameraPosition",
  "pitch": -11.05
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 94.89,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AEC4844B_B83A_D80A_41DA_0E31372034FF"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 112.46,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": -94.08,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -22.04,
    "yawSpeed": 38.75,
    "pitchSpeed": 19.79,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 83.28,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -16.27,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 176.48,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -4.71,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_AF1E34B6_B83A_D81A_41C7_FAB3954E790B"
},
{
 "viewerArea": "this.MapViewer",
 "buttonZoomIn": "this.IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3",
 "class": "MapPlayer",
 "movementMode": "constrained",
 "buttonZoomOut": "this.IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08",
 "id": "MapViewerMapPlayer"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -94.08,
  "class": "PanoramaCameraPosition",
  "pitch": -22.04
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 83.28,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -16.27,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 176.48,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -4.71,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "panorama_A91A921B_A37D_0854_41D2_52092A29C33E_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -84.73,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 4.27,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -14.82,
    "yawSpeed": 33.85,
    "pitchSpeed": 17.35,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 92.83,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -17.02,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_AD24E5F0_B83A_D816_41D7_B7BC813C5AB5"
},
{
 "label": "Male Toilet (3)",
 "hfovMin": "120%",
 "id": "panorama_A91CE93C_A37D_184C_41E1_944F221C3F69",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B",
   "yaw": -76.32,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 95.27
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E"
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_B850C43D_A58D_09BF_41DB_A49AECA5B3EF",
  "this.overlay_BA5D9525_A5BD_0B54_41D9_A34C16F07F9E"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_t.jpg",
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 103.68,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 98.73,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -22.61,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_AEE1248F_B83A_D80A_41E6_D9B8597AEFDA"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -4.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 4.27,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -14.82,
    "yawSpeed": 7.35,
    "pitchSpeed": 4.16,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 92.83,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -17.02,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_AD531617_B83A_D81A_41B4_2462A3700DA0"
},
{
 "duration": 5000,
 "thumbnailUrl": "media/album_B20C4ED2_AB89_0266_4171_27B302650120_0_t.jpg",
 "id": "album_B20C4ED2_AB89_0266_4171_27B302650120_0",
 "width": 2599,
 "label": "Floor Plan 3D",
 "class": "Photo",
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "class": "ImageResourceLevel",
    "url": "media/album_B20C4ED2_AB89_0266_4171_27B302650120_0.jpg"
   }
  ]
 },
 "height": 2147
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 98.73,
  "class": "PanoramaCameraPosition",
  "pitch": -22.61
 },
 "automaticZoomSpeed": 10,
 "id": "panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_camera"
},
{
 "buttonPlayRight": "this.IconButton_A33A755B_B34E_D779_41D0_F53AE4560B89",
 "gyroscopeVerticalDraggingEnabled": true,
 "buttonZoomIn": "this.IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3",
 "buttonRestart": "this.IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B",
 "buttonMoveRight": "this.IconButton_A33A555B_B34E_D779_41E2_B4C0923C2D09",
 "touchControlMode": "drag_rotation",
 "id": "MainViewerPanoramaPlayer",
 "buttonPause": "this.IconButton_A33AB55B_B34E_D779_41DC_3788F4E6C492",
 "viewerArea": "this.MainViewer",
 "buttonMoveDown": "this.IconButton_A33AA55B_B34E_D779_41E1_474ADCB39358",
 "buttonMoveLeft": "this.IconButton_A33AE55A_B34E_D77B_41E1_7B4FCB448F85",
 "class": "PanoramaPlayer",
 "displayPlaybackBar": true,
 "buttonZoomOut": "this.IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08",
 "buttonMoveUp": "this.IconButton_A33A855A_B34E_D778_41D3_081B5F186BCE",
 "buttonCardboardView": "this.IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887",
 "buttonPlayLeft": "this.IconButton_A33AF55A_B34E_D77B_41B6_6D0880405734",
 "mouseControlMode": "drag_acceleration"
},
{
 "viewerArea": "this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95F",
 "buttonZoomIn": "this.IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3",
 "class": "MapPlayer",
 "movementMode": "constrained",
 "buttonZoomOut": "this.IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08",
 "id": "ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95FMapPlayer"
},
{
 "items": [
  "this.PanoramaPlayListItem_AEBF33E6_B83A_D83A_41CD_75DC2D9D3423",
  "this.PanoramaPlayListItem_AEBEF3E7_B83A_D83A_41B1_3CD5F5611DC3",
  "this.PanoramaPlayListItem_AEB983E7_B83A_D83A_41AA_E252D285F5F0",
  {
   "media": "this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F",
   "camera": "this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38",
   "camera": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1",
   "camera": "this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_AEBB83E9_B83A_D836_41DB_988FADFB79D0",
  "this.PanoramaPlayListItem_AEBB33E9_B83A_D836_41E5_DA8823FD44C4",
  {
   "media": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B",
   "camera": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91CE93C_A37D_184C_41E1_944F221C3F69",
   "camera": "this.panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  "this.PanoramaPlayListItem_AEA5B3F0_B83A_D816_41D7_EAF34BBD8F20",
  {
   "media": "this.album_B20C4ED2_AB89_0266_4171_27B302650120",
   "end": "this.trigger('tourEnded')",
   "class": "PhotoAlbumPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 0)",
   "player": "this.MainViewerPhotoAlbumPlayer"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "label": "Female Toilet (3)",
 "hfovMin": "120%",
 "id": "panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F"
  },
  {
   "panorama": "this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1",
   "yaw": 88.74,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 20.91
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_B3292BA0_A487_1FF1_41BB_EEC8786B485B",
  "this.overlay_BC55605C_A485_093C_41E4_63B17991BCFB"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_t.jpg",
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -91.26,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AEDD3425_B83A_D83E_41CD_0C5391ACD3AB"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 4.27,
  "class": "PanoramaCameraPosition",
  "pitch": -14.82
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 92.83,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -17.02,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_camera"
},
{
 "viewerArea": "this.MainViewer",
 "buttonRestart": "this.IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B",
 "id": "MainViewerPhotoAlbumPlayer",
 "class": "PhotoAlbumPlayer",
 "buttonPause": "this.IconButton_A33AB55B_B34E_D779_41DC_3788F4E6C492"
},
{
 "label": "Entrance (1)",
 "hfovMin": "120%",
 "id": "panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F",
   "yaw": 92.76,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 177.17
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_AE18368B_A383_084B_41D5_337FDB2D237E"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "x": 2222.57,
   "class": "PanoramaMapLocation",
   "y": 981.41,
   "angle": 178.3
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "items": [
  {
   "begin": "this.MapViewerMapPlayer.set('movementMode', 'sync_with_field_of_view')",
   "media": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "class": "MapPlayListItem",
   "player": "this.MapViewerMapPlayer"
  }
 ],
 "id": "DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C_playlist",
 "class": "PlayList"
},
{
 "label": "Male Toilet (1)",
 "hfovMin": "120%",
 "id": "panorama_A919A752_A37F_08D7_41E3_AD725415E551",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F",
   "yaw": -83.1,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 79.69
  },
  {
   "panorama": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B",
   "yaw": 80.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -2.71
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_BE20DFEC_A583_16CA_41D7_A691BB7246BF",
  "this.overlay_BDBEEF34_A583_376C_41DC_AB808A5DD641"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "x": 1514.54,
   "class": "PanoramaMapLocation",
   "y": 509.99,
   "angle": -91.44
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "label": "Male Toilet (2)",
 "hfovMin": "120%",
 "id": "panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551",
   "yaw": -2.71,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 80.45
  },
  {
   "panorama": "this.panorama_A91CE93C_A37D_184C_41E1_944F221C3F69",
   "yaw": 95.27,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -76.32
  },
  {
   "panorama": "this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E",
   "yaw": 175.1,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -67.54
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_BE83CAB2_A583_3952_41E0_799CC942D046",
  "this.overlay_86C4A1ED_A58D_0AB9_41DE_B1EB6F931F2A",
  "this.overlay_867DBCBA_A583_1A9C_41E2_83362EB4D4BB"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_t.jpg",
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -87.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AD35E5C8_B83A_D876_41D9_7D89806EE4D5"
},
{
 "label": "Male Toilet (4)",
 "hfovMin": "120%",
 "id": "panorama_A91A921B_A37D_0854_41D2_52092A29C33E",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B",
   "yaw": -67.54,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 175.1
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551"
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_840EEBC7_A59D_FEDC_41C8_95CCE9EB0F3C",
  "this.overlay_82630082_A587_0A82_41C0_BE76E5D1BF7F"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_t.jpg",
 "mapLocations": [
  {
   "map": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "x": 461.43,
   "class": "PanoramaMapLocation",
   "y": 574.95,
   "angle": 274.08
  }
 ],
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -99.55,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 94.21,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -13.82,
    "yawSpeed": 92.74,
    "pitchSpeed": 46.66,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 26,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -10.49,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_AEC93468_B83A_D836_41E5_9EA5879462E3"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -87.24,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AD0D15B4_B83A_D81E_41E2_DD0637CD7B47"
},
{
 "items": [
  {
   "begin": "this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95FMapPlayer.set('movementMode', 'sync_with_field_of_view')",
   "media": "this.map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8",
   "class": "MapPlayListItem",
   "player": "this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95FMapPlayer"
  }
 ],
 "id": "playList_AE8B53D5_B83A_D81F_41E0_643F4AB043B9",
 "class": "PlayList"
},
{
 "label": "Female Toilet (4)",
 "hfovMin": "120%",
 "id": "panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1",
 "pitch": 0,
 "partial": false,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38",
   "yaw": 20.91,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 88.74
  },
  {
   "panorama": "this.panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D",
   "yaw": -103.45,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -85.11
  }
 ],
 "hfov": 360,
 "overlays": [
  "this.overlay_B398C6D2_A485_0919_41B0_8AFEA137DB54",
  "this.overlay_B3BED1EE_A49D_0B1E_41E3_18F788ADA7BC"
 ],
 "vfov": 180,
 "thumbnailUrl": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_t.jpg",
 "class": "Panorama",
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/f/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/f/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/f/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/f/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/u/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/u/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/u/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/u/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/r/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/r/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/r/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/r/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/b/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/b/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/b/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/b/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_t.jpg",
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/d/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/d/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/d/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/d/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/l/0/{row}_{column}.jpg",
      "colCount": 6,
      "class": "TiledImageResourceLevel",
      "width": 3072,
      "tags": "ondemand",
      "rowCount": 6,
      "height": 3072
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/l/1/{row}_{column}.jpg",
      "colCount": 3,
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "tags": "ondemand",
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/l/2/{row}_{column}.jpg",
      "colCount": 2,
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "tags": "ondemand",
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0/l/3/{row}_{column}.jpg",
      "colCount": 1,
      "class": "TiledImageResourceLevel",
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "rowCount": 1,
      "height": 512
     }
    ]
   }
  }
 ]
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 96.9,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "targetYaw": 94.21,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -13.82,
    "yawSpeed": 7.65,
    "pitchSpeed": 4.31,
    "easing": "cubic_in_out"
   },
   {
    "targetYaw": 26,
    "class": "TargetPanoramaCameraMovement",
    "path": "shortest",
    "targetPitch": -10.49,
    "yawSpeed": 33.25,
    "pitchSpeed": 17.05,
    "easing": "cubic_in_out"
   }
  ]
 },
 "id": "camera_AD1F658D_B83A_D80E_41BE_496B55ADE182"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 147.13,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AD3DE5DC_B83A_D80E_41DE_57BAC22E780A"
},
{
 "playList": "this.album_B20C4ED2_AB89_0266_4171_27B302650120_AlbumPlayList",
 "thumbnailUrl": "media/album_B20C4ED2_AB89_0266_4171_27B302650120_t.png",
 "id": "album_B20C4ED2_AB89_0266_4171_27B302650120",
 "label": "Photo Album Floor Plan 3D",
 "class": "PhotoAlbum"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 91.7,
  "class": "PanoramaCameraPosition",
  "pitch": -10.05
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_camera"
},
{
 "items": [
  {
   "media": "this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21",
   "camera": "this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F",
   "camera": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66",
   "camera": "this.panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F",
   "camera": "this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38",
   "camera": "this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1",
   "camera": "this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D",
   "camera": "this.panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551",
   "camera": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B",
   "camera": "this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91CE93C_A37D_184C_41E1_944F221C3F69",
   "camera": "this.panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E",
   "camera": "this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "begin": "this.setEndToItemIndex(this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist, 11, 0)",
   "media": "this.album_B20C4ED2_AB89_0266_4171_27B302650120",
   "class": "PhotoAlbumPlayListItem",
   "player": "this.MainViewerPhotoAlbumPlayer"
  }
 ],
 "id": "ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -88.18,
  "class": "PanoramaCameraPosition",
  "pitch": -8.29
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -100.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_ACEFA551_B83A_D816_41DB_1615F6596DC9"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 88.68,
  "class": "PanoramaCameraPosition",
  "pitch": -14.82
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_camera"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -2.83,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "restartMovementOnUserInteraction": false,
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "yawSpeed": 7.96,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_AF3D74DC_B83A_D80E_41E4_F92D0DAC10A2"
},
{
 "toolTipFontWeight": "normal",
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeadWidth": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBorderRadius": 0,
 "width": "100%",
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 50,
 "toolTipFontStyle": "normal",
 "class": "ViewerArea",
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 100,
 "borderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "transparent",
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 0,
 "toolTipShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "toolTipPaddingRight": 6,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "paddingRight": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "progressBarOpacity": 1,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "progressBorderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadHeight": 15,
 "top": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "paddingBottom": 0,
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBottom": 5,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.87,
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipFontSize": "1.11vmin",
 "progressBorderColor": "#000000",
 "toolTipPaddingBottom": 4,
 "playbackBarHeadOpacity": 1,
 "toolTipTextShadowBlurRadius": 3,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 }
},
{
 "id": "Container_BD97D3E3_B35B_337B_41D2_122E80886A12",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "100%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "top": "0%",
 "propagateClick": false,
 "minHeight": 1,
 "height": "100%",
 "gap": 10,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "FULL"
 }
},
{
 "children": [
  "this.HTMLText_BCD9F518_B347_D4C8_41CB_ADCF5B9273B1"
 ],
 "id": "Container_BC0FE789_B359_D3B6_41D3_D9E53B4D1D06",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "75%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "top": "0%",
 "propagateClick": false,
 "minHeight": 1,
 "gap": 10,
 "minWidth": 1,
 "bottom": "85%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "layout": "absolute",
 "paddingTop": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "CONTAIN 01"
 }
},
{
 "children": [
  "this.Container_A7985D21_B2CF_5787_41CC_8E1A821CCF18",
  "this.Container_A124E5EC_B547_369A_41B5_87CD9DA671BA",
  "this.Container_A1DC1C15_B547_558B_41DB_85399D84BF5D",
  "this.Container_AF65A9AF_B5C6_DE2D_41B0_64E448626E9A"
 ],
 "id": "Container_BC08CB49_B34B_DCB6_41E6_4FE442812364",
 "scrollBarMargin": 2,
 "width": "25%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "right": "0%",
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "top": "0%",
 "propagateClick": false,
 "minHeight": 1,
 "height": "100%",
 "gap": 10,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "container right "
 }
},
{
 "children": [
  "this.Container_A02FBFA6_B2DA_D281_41DD_61215F8DF26E",
  "this.Container_BDA5AD02_B347_D4BA_41DC_ACA78CD343CA",
  "this.Container_A7A78BFA_B2CB_F284_41B6_D2A33200B385"
 ],
 "id": "Container_BDD81119_B34F_2CC9_41E0_C7FE83317472",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "75.03%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "height": "84.918%",
 "gap": 10,
 "minWidth": 1,
 "bottom": "0.11%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "contai"
 }
},
{
 "id": "IconButton_A33A155B_B34E_D779_41E5_815C89264E42",
 "width": 40,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "height": 40,
 "minWidth": 0,
 "mode": "toggle",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33A155B_B34E_D779_41E5_815C89264E42.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33A155B_B34E_D779_41E5_815C89264E42_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43175"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 6.01,
   "yaw": -85.11,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -64.45
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1, this.camera_ACE1353E_B83A_D80D_41CE_9AB3C59001BC); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 6.01,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_0_HS_2_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -64.45,
   "yaw": -85.11,
   "distance": 50
  }
 ],
 "id": "overlay_B39AB54D_A49D_0B1D_41E1_655AE73C0D6F",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 100,
  "x": 2173.52,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_0_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 36
    }
   ]
  },
  "y": 866.09,
  "offsetY": 0,
  "height": 231.95,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 2172.57,
  "y": 865.43,
  "width": 100,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_0.png",
     "width": 100,
     "class": "ImageResourceLevel",
     "height": 231
    }
   ]
  },
  "height": 231.95
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_ACBF63AB_A387_0846_41D0_0F8CEF906FE1",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 100,
  "x": 1421.55,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_1_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 37
    }
   ]
  },
  "y": 859.81,
  "offsetY": 0,
  "height": 231.95,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 1420.16,
  "y": 858.44,
  "width": 100,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_1.png",
     "width": 99,
     "class": "ImageResourceLevel",
     "height": 231
    }
   ]
  },
  "height": 231.95
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_B345115F_A38F_08E9_41D1_BAD4832DB703",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 100,
  "x": 412.79,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_6_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 38
    }
   ]
  },
  "y": 456.42,
  "offsetY": 0,
  "height": 239.47,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 411.43,
  "y": 455.21,
  "width": 100,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_6.png",
     "width": 99,
     "class": "ImageResourceLevel",
     "height": 239
    }
   ]
  },
  "height": 239.47
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_B0965908_A38D_F87C_41BF_11CB4005B64B",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 100,
  "x": 584.87,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_10_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 37
    }
   ]
  },
  "y": 1521.79,
  "offsetY": 0,
  "height": 231.95,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 583.55,
  "y": 1520.39,
  "width": 100,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_10.png",
     "width": 99,
     "class": "ImageResourceLevel",
     "height": 231
    }
   ]
  },
  "height": 231.95
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_B14AA3C5_A387_0FF6_41DB_2960DAD2569B",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 100,
  "x": 1466.12,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_12_map.gif",
     "width": 18,
     "class": "ImageResourceLevel",
     "height": 16
    }
   ]
  },
  "y": 468.27,
  "offsetY": 0,
  "height": 86.63,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 1464.54,
  "y": 466.67,
  "width": 100,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_12.png",
     "width": 99,
     "class": "ImageResourceLevel",
     "height": 86
    }
   ]
  },
  "height": 86.63
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_8CFEDF8C_A483_16BF_41D6_1D20B9B421A2",
 "data": {
  "label": "Image"
 }
},
{
 "map": {
  "width": 100,
  "x": 1442.8,
  "class": "HotspotMapOverlayMap",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_13_map.gif",
     "width": 16,
     "class": "ImageResourceLevel",
     "height": 31
    }
   ]
  },
  "y": 1673.18,
  "offsetY": 0,
  "height": 192.23,
  "offsetX": 0
 },
 "class": "AreaHotspotMapOverlay",
 "image": {
  "x": 1441.26,
  "y": 1671.77,
  "width": 100,
  "class": "HotspotMapOverlayImage",
  "image": {
   "class": "ImageResource",
   "levels": [
    {
     "url": "media/map_ACA8DF4F_A387_38DF_41E0_8E9C72C6E1F8_HS_13.png",
     "width": 99,
     "class": "ImageResourceLevel",
     "height": 192
    }
   ]
  },
  "height": 192.23
 },
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotMapOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "id": "overlay_A55D71B1_A889_3FB6_41E4_BEE33529F063",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.09,
   "yaw": 107.83,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.6
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.09,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0_HS_0_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -43.6,
   "yaw": 107.83,
   "distance": 50
  }
 ],
 "id": "overlay_B1009C61_A3BD_389B_41E0_2A213889AA07",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 1.13,
   "yaw": -32.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -84.28
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F, this.camera_AD4FB63E_B83A_D80A_4196_8182E6FDBE7A); this.mainPlayList.set('selectedIndex', 4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.13,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91FA387_A37F_083D_41D3_095D0D14132F_0_HS_1_0.png",
      "width": 259,
      "class": "ImageResourceLevel",
      "height": 260
     }
    ]
   },
   "pitch": -84.28,
   "yaw": -32.87,
   "distance": 50
  }
 ],
 "id": "overlay_B33040EE_A483_0908_41DD_93899A273745",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.5,
   "yaw": 79.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -41.09
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A919A752_A37F_08D7_41E3_AD725415E551, this.camera_AD1F658D_B83A_D80E_41BE_496B55ADE182); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.5,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_0_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -41.09,
   "yaw": 79.69,
   "distance": 50
  }
 ],
 "id": "overlay_AD6939C4_A383_7838_41E3_FF5EBD769A12",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 12.44,
   "yaw": -87.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -26.77
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91FA387_A37F_083D_41D3_095D0D14132F, this.camera_AD3DE5DC_B83A_D80E_41DE_57BAC22E780A); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 12.44,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_1_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -26.77,
   "yaw": -87.87,
   "distance": 50
  }
 ],
 "id": "overlay_AC890E78_A39D_18C8_41D1_CD1EACE740B9",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 11.64,
   "yaw": 177.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -33.3
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21, this.camera_AD0D15B4_B83A_D81E_41E2_DD0637CD7B47); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.64,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_2_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -33.3,
   "yaw": 177.17,
   "distance": 50
  }
 ],
 "id": "overlay_AC293B44_A39D_1839_41C8_B39736FB12E9",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 3.37,
   "yaw": -3.96,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -76.01
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21, this.camera_AD35E5C8_B83A_D876_41D9_7D89806EE4D5); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.37,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_0_HS_3_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -76.01,
   "yaw": -3.96,
   "distance": 50
  }
 ],
 "id": "overlay_BC9079C6_A483_1B18_41DD_E59CAFA6180A",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.13,
   "yaw": 84.72,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.35
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.13,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0_HS_0_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -43.35,
   "yaw": 84.72,
   "distance": 50
  }
 ],
 "id": "overlay_B11897C0_A3BD_1795_41DF_C19B2187414A",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.3,
   "yaw": -90.13,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -42.35
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.3,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_0_HS_1_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -42.35,
   "yaw": -90.13,
   "distance": 50
  }
 ],
 "id": "overlay_B3194FCB_A48D_1709_41E0_3763049924FE",
 "data": {
  "label": "Image"
 }
},
{
 "toolTipFontWeight": "normal",
 "playbackBarHeight": 10,
 "id": "MapViewer",
 "left": "3.59%",
 "playbackBarHeadWidth": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBorderRadius": 0,
 "width": "91.566%",
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "toolTipFontStyle": "normal",
 "class": "ViewerArea",
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "height": "85.784%",
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 1,
 "borderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "toolTipShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "toolTipPaddingRight": 6,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "paddingRight": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "progressBarOpacity": 1,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "progressBorderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "bottom": "0%",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBottom": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipFontSize": "1.11vmin",
 "progressBorderColor": "#000000",
 "toolTipPaddingBottom": 4,
 "playbackBarHeadOpacity": 1,
 "visible": false,
 "toolTipTextShadowBlurRadius": 3,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "MapViewer"
 }
},
{
 "id": "IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3",
 "width": 32,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3_rollover.png",
 "height": 32,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43176"
 }
},
{
 "id": "IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08",
 "width": 32,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08_rollover.png",
 "height": 32,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43165"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 8.56,
   "yaw": -76.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0_HS_0_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -55.02
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B, this.camera_AD24E5F0_B83A_D816_41D7_B7BC813C5AB5); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.56,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0_HS_0_0.png",
      "width": 339,
      "class": "ImageResourceLevel",
      "height": 311
     }
    ]
   },
   "pitch": -55.02,
   "yaw": -76.32,
   "distance": 50
  }
 ],
 "id": "overlay_B850C43D_A58D_09BF_41DB_A49AECA5B3EF",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 9.32,
   "yaw": -138.87,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -43.85
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.32,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91CE93C_A37D_184C_41E1_944F221C3F69_0_HS_1_0.png",
      "width": 294,
      "class": "ImageResourceLevel",
      "height": 295
     }
    ]
   },
   "pitch": -43.85,
   "yaw": -138.87,
   "distance": 50
  }
 ],
 "id": "overlay_BA5D9525_A5BD_0B54_41D9_A34C16F07F9E",
 "data": {
  "label": "Image"
 }
},
{
 "id": "IconButton_A33A755B_B34E_D779_41D0_F53AE4560B89",
 "width": 40,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33A755B_B34E_D779_41D0_F53AE4560B89_rollover.png",
 "height": 40,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33A755B_B34E_D779_41D0_F53AE4560B89.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33A755B_B34E_D779_41D0_F53AE4560B89_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43174"
 }
},
{
 "id": "IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B",
 "width": 40,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B_rollover.png",
 "height": 40,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43166"
 }
},
{
 "id": "IconButton_A33A555B_B34E_D779_41E2_B4C0923C2D09",
 "width": 32,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33A555B_B34E_D779_41E2_B4C0923C2D09_rollover.png",
 "height": 32,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33A555B_B34E_D779_41E2_B4C0923C2D09.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33A555B_B34E_D779_41E2_B4C0923C2D09_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43173"
 }
},
{
 "id": "IconButton_A33AB55B_B34E_D779_41DC_3788F4E6C492",
 "width": 40,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "height": 40,
 "minWidth": 0,
 "mode": "toggle",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33AB55B_B34E_D779_41DC_3788F4E6C492.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33AB55B_B34E_D779_41DC_3788F4E6C492_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43171"
 }
},
{
 "id": "IconButton_A33AA55B_B34E_D779_41E1_474ADCB39358",
 "width": 32,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33AA55B_B34E_D779_41E1_474ADCB39358_rollover.png",
 "height": 32,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33AA55B_B34E_D779_41E1_474ADCB39358.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33AA55B_B34E_D779_41E1_474ADCB39358_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43172"
 }
},
{
 "id": "IconButton_A33AE55A_B34E_D77B_41E1_7B4FCB448F85",
 "width": 32,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33AE55A_B34E_D77B_41E1_7B4FCB448F85_rollover.png",
 "height": 32,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33AE55A_B34E_D77B_41E1_7B4FCB448F85.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33AE55A_B34E_D77B_41E1_7B4FCB448F85_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43168"
 }
},
{
 "id": "IconButton_A33A855A_B34E_D778_41D3_081B5F186BCE",
 "width": 32,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33A855A_B34E_D778_41D3_081B5F186BCE_rollover.png",
 "height": 32,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33A855A_B34E_D778_41D3_081B5F186BCE.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33A855A_B34E_D778_41D3_081B5F186BCE_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43170"
 }
},
{
 "maxHeight": 70,
 "maxWidth": 70,
 "id": "IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887",
 "width": 65,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 1,
 "propagateClick": false,
 "height": 70,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887.png",
 "click": "this.openLink('https://www.cmedcc.com/', '_blank')",
 "mode": "push",
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887_pressed.png",
 "visible": false,
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "URL"
 }
},
{
 "id": "IconButton_A33AF55A_B34E_D77B_41B6_6D0880405734",
 "width": 40,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 0,
 "propagateClick": false,
 "rollOverIconURL": "skin/IconButton_A33AF55A_B34E_D77B_41B6_6D0880405734_rollover.png",
 "height": 40,
 "minWidth": 0,
 "mode": "push",
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "iconURL": "skin/IconButton_A33AF55A_B34E_D77B_41B6_6D0880405734.png",
 "paddingTop": 0,
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A33AF55A_B34E_D77B_41B6_6D0880405734_pressed.png",
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "Button43167"
 }
},
{
 "toolTipFontWeight": "normal",
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95F",
 "left": "3.61%",
 "playbackBarHeadWidth": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarRight": 0,
 "progressBarBorderSize": 0,
 "playbackBarProgressBorderSize": 0,
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarProgressBorderRadius": 0,
 "width": "91.566%",
 "paddingLeft": 0,
 "progressBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "playbackBarBorderRadius": 0,
 "minHeight": 1,
 "toolTipFontStyle": "normal",
 "class": "ViewerArea",
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "toolTipTextShadowOpacity": 0,
 "playbackBarHeadBorderRadius": 0,
 "toolTipFontFamily": "Arial",
 "propagateClick": false,
 "borderSize": 0,
 "playbackBarProgressOpacity": 1,
 "height": "85.567%",
 "progressLeft": 0,
 "playbackBarBorderSize": 0,
 "minWidth": 1,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBorderSize": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipFontColor": "#606060",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "progressOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipShadowHorizontalLength": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressBottom": 2,
 "toolTipShadowVerticalLength": 0,
 "progressHeight": 10,
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "toolTipPaddingRight": 6,
 "transitionMode": "blending",
 "toolTipBorderSize": 1,
 "toolTipPaddingLeft": 6,
 "paddingRight": 0,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "toolTipDisplayTime": 600,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "progressBarOpacity": 1,
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "progressBorderRadius": 0,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "bottom": "0%",
 "playbackBarHeadHeight": 15,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0
 ],
 "paddingBottom": 0,
 "click": "this.setMediaBehaviour(this.playList_AE8B53D5_B83A_D81F_41E0_643F4AB043B9, 0)",
 "progressBarBorderColor": "#000000",
 "paddingTop": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "progressBackgroundColorDirection": "vertical",
 "toolTipShadowSpread": 0,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBottom": 0,
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipBorderColor": "#767676",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipFontSize": "1.11vmin",
 "progressBorderColor": "#000000",
 "toolTipPaddingBottom": 4,
 "playbackBarHeadOpacity": 1,
 "visible": false,
 "toolTipTextShadowBlurRadius": 3,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer 2"
 }
},
{
 "camera": "this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_AEBF33E6_B83A_D83A_41CD_75DC2D9D3423, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 0, 1)",
 "media": "this.panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21",
 "id": "PanoramaPlayListItem_AEBF33E6_B83A_D83A_41CD_75DC2D9D3423",
 "player": "this.MainViewerPanoramaPlayer"
},
{
 "camera": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_AEBEF3E7_B83A_D83A_41B1_3CD5F5611DC3, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 1, 2)",
 "media": "this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F",
 "id": "PanoramaPlayListItem_AEBEF3E7_B83A_D83A_41B1_3CD5F5611DC3",
 "player": "this.MainViewerPanoramaPlayer"
},
{
 "camera": "this.panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_AEB983E7_B83A_D83A_41AA_E252D285F5F0, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 2, 3)",
 "media": "this.panorama_A91F5AE9_A37F_19F5_41D9_3A3B28C83D66",
 "id": "PanoramaPlayListItem_AEB983E7_B83A_D83A_41AA_E252D285F5F0",
 "player": "this.MainViewerPanoramaPlayer"
},
{
 "camera": "this.panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_AEBB83E9_B83A_D836_41DB_988FADFB79D0, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 6, 7)",
 "media": "this.panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D",
 "id": "PanoramaPlayListItem_AEBB83E9_B83A_D836_41DB_988FADFB79D0",
 "player": "this.MainViewerPanoramaPlayer"
},
{
 "camera": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_AEBB33E9_B83A_D836_41E5_DA8823FD44C4, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 7, 8)",
 "media": "this.panorama_A919A752_A37F_08D7_41E3_AD725415E551",
 "id": "PanoramaPlayListItem_AEBB33E9_B83A_D836_41E5_DA8823FD44C4",
 "player": "this.MainViewerPanoramaPlayer"
},
{
 "camera": "this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E_camera",
 "class": "PanoramaPlayListItem",
 "begin": "this.setMapLocation(this.PanoramaPlayListItem_AEA5B3F0_B83A_D816_41D7_EAF34BBD8F20, this.MapViewerMapPlayer); this.setEndToItemIndex(this.mainPlayList, 10, 11)",
 "media": "this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E",
 "id": "PanoramaPlayListItem_AEA5B3F0_B83A_D816_41D7_EAF34BBD8F20",
 "player": "this.MainViewerPanoramaPlayer"
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 11.4,
   "yaw": 88.74,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -35.06
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1, this.camera_AF22C4F0_B83A_D816_41A2_04DF7AA96C28); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 11.4,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0_HS_3_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -35.06,
   "yaw": 88.74,
   "distance": 50
  }
 ],
 "id": "overlay_B3292BA0_A487_1FF1_41BB_EEC8786B485B",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 7.66,
   "yaw": -53.7,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -56.67
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 7.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38_0_HS_4_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -56.67,
   "yaw": -53.7,
   "distance": 50
  }
 ],
 "id": "overlay_BC55605C_A485_093C_41E4_63B17991BCFB",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.85,
   "yaw": 92.76,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -38.83
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F, this.camera_AF3D74DC_B83A_D80E_41E4_F92D0DAC10A2); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.85,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A8A0A89F_A37F_784D_41B6_CAD7FE93FA21_1_HS_0_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -38.83,
   "yaw": 92.76,
   "distance": 50
  }
 ],
 "id": "overlay_AE18368B_A383_084B_41D5_337FDB2D237E",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 8.45,
   "yaw": -83.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -52.65
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A922D1C2_A37F_0834_4175_9CFF9ABE5B6F, this.camera_ACEFA551_B83A_D816_41DB_1615F6596DC9); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0_HS_1_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -52.65,
   "yaw": -83.1,
   "distance": 50
  }
 ],
 "id": "overlay_BE20DFEC_A583_16CA_41D7_A691BB7246BF",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 5.95,
   "yaw": 80.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -64.71
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B, this.camera_ACE83566_B83A_D83A_41E5_ABB300D59EFB); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.95,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A919A752_A37F_08D7_41E3_AD725415E551_0_HS_0_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -64.71,
   "yaw": 80.45,
   "distance": 50
  }
 ],
 "id": "overlay_BDBEEF34_A583_376C_41DC_AB808A5DD641",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 5.62,
   "yaw": 95.27,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -66.21
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91CE93C_A37D_184C_41E1_944F221C3F69, this.camera_AEE1248F_B83A_D80A_41E6_D9B8597AEFDA); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 5.62,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0_HS_0_0.png",
      "width": 316,
      "class": "ImageResourceLevel",
      "height": 317
     }
    ]
   },
   "pitch": -66.21,
   "yaw": 95.27,
   "distance": 50
  }
 ],
 "id": "overlay_BE83CAB2_A583_3952_41E0_799CC942D046",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 3.8,
   "yaw": 175.1,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -67.15
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91A921B_A37D_0854_41D2_52092A29C33E, this.camera_AF1E34B6_B83A_D81A_41C7_FAB3954E790B); this.mainPlayList.set('selectedIndex', 10)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 3.8,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0_HS_5_0.png",
      "width": 222,
      "class": "ImageResourceLevel",
      "height": 223
     }
    ]
   },
   "pitch": -67.15,
   "yaw": 175.1,
   "distance": 50
  }
 ],
 "id": "overlay_86C4A1ED_A58D_0AB9_41DE_B1EB6F931F2A",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 8.35,
   "yaw": -2.71,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0_HS_6_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -53.15
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A919A752_A37F_08D7_41E3_AD725415E551, this.camera_AEC93468_B83A_D836_41E5_9EA5879462E3); this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.35,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B_0_HS_6_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -53.15,
   "yaw": -2.71,
   "distance": 50
  }
 ],
 "id": "overlay_867DBCBA_A583_1A9C_41E2_83362EB4D4BB",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 1.45,
   "yaw": -67.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -83.53
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91D500C_A37D_0833_418E_95BFDAFF1C9B, this.camera_AD531617_B83A_D81A_41B4_2462A3700DA0); this.mainPlayList.set('selectedIndex', 8)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 1.45,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0_HS_2_0.png",
      "width": 293,
      "class": "ImageResourceLevel",
      "height": 294
     }
    ]
   },
   "pitch": -83.53,
   "yaw": -67.54,
   "distance": 50
  }
 ],
 "id": "overlay_840EEBC7_A59D_FEDC_41C8_95CCE9EB0F3C",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.05,
   "yaw": 174.6,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0_HS_3_0_0_map.gif",
      "width": 21,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -21.55
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 7)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.05,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91A921B_A37D_0854_41D2_52092A29C33E_0_HS_3_0.png",
      "width": 245,
      "class": "ImageResourceLevel",
      "height": 183
     }
    ]
   },
   "pitch": -21.55,
   "yaw": 174.6,
   "distance": 50
  }
 ],
 "id": "overlay_82630082_A587_0A82_41C0_BE76E5D1BF7F",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 10.66,
   "yaw": 20.91,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -40.09
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91F3C78_A37F_38D3_41B9_FE55AAEB9D38, this.camera_AEDD3425_B83A_D83E_41CD_0C5391ACD3AB); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.66,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0_HS_2_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -40.09,
   "yaw": 20.91,
   "distance": 50
  }
 ],
 "id": "overlay_B398C6D2_A485_0919_41B0_8AFEA137DB54",
 "data": {
  "label": "Image"
 }
},
{
 "enabledInCardboard": true,
 "maps": [
  {
   "hfov": 8.16,
   "yaw": -103.45,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0_HS_3_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -54.15
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "rollOverDisplay": false,
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_A91BCE5F_A37F_18CD_41E0_6E677B19F60D, this.camera_AEC4844B_B83A_D80A_41DA_0E31372034FF); this.mainPlayList.set('selectedIndex', 6)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "useHandCursor": true,
 "items": [
  {
   "hfov": 8.16,
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A91BA56A_A37F_08F7_41C8_80A67DD8FBB1_0_HS_3_0.png",
      "width": 317,
      "class": "ImageResourceLevel",
      "height": 318
     }
    ]
   },
   "pitch": -54.15,
   "yaw": -103.45,
   "distance": 50
  }
 ],
 "id": "overlay_B3BED1EE_A49D_0B1E_41E3_18F788ADA7BC",
 "data": {
  "label": "Image"
 }
},
{
 "items": [
  {
   "media": "this.album_B20C4ED2_AB89_0266_4171_27B302650120_0",
   "camera": {
    "duration": 5000,
    "targetPosition": {
     "x": "0.54",
     "zoomFactor": 1.1,
     "class": "PhotoCameraPosition",
     "y": "0.44"
    },
    "class": "MovementPhotoCamera",
    "initialPosition": {
     "x": "0.50",
     "zoomFactor": 1,
     "class": "PhotoCameraPosition",
     "y": "0.50"
    },
    "scaleMode": "fit_outside",
    "easing": "linear"
   },
   "class": "PhotoPlayListItem"
  }
 ],
 "id": "album_B20C4ED2_AB89_0266_4171_27B302650120_AlbumPlayList",
 "class": "PhotoPlayList"
},
{
 "id": "HTMLText_BCD9F518_B347_D4C8_41CB_ADCF5B9273B1",
 "left": "0.08%",
 "scrollBarMargin": 2,
 "width": "56.109%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "paddingLeft": 10,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "HTMLText",
 "borderColor": "#000000",
 "propagateClick": false,
 "height": "75.811%",
 "minWidth": 1,
 "bottom": "4.23%",
 "borderSize": 3,
 "paddingBottom": 10,
 "minHeight": 1,
 "paddingTop": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:45px;\"><B>HATTHA KAKSEKAR LIMITED</B></SPAN><SPAN STYLE=\"color:#ffffff;font-size:35px;\"><B> </B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#003399;font-size:30px;\"><B><I>Toilet (Core)</I></B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:30px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p></div>",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "HTMLText1580"
 }
},
{
 "children": [
  "this.Button_A3532BFB_B3C7_730A_41DD_8C04069188F9",
  "this.Button_A328AA9A_B3C9_DD09_41E0_033731F29BBC"
 ],
 "id": "Container_A7985D21_B2CF_5787_41CC_8E1A821CCF18",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "100%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "height": "20%",
 "gap": 40,
 "minWidth": 1,
 "bottom": "0.33%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "hidden",
 "minHeight": 1,
 "paddingTop": 0,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "data": {
  "name": "Container20258"
 }
},
{
 "children": [
  "this.Image_A72BE303_B546_F38E_41DE_54F34B520AE6"
 ],
 "id": "Container_A124E5EC_B547_369A_41B5_87CD9DA671BA",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "86.506%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "height": "26.23%",
 "gap": 10,
 "minWidth": 1,
 "bottom": "20.44%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "paddingTop": 0,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "data": {
  "name": "Container20923"
 }
},
{
 "children": [
  "this.Image_AE897C89_B549_76C1_41D3_DF0C8FDC37F6",
  "this.IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887",
  "this.IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987",
  "this.IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C"
 ],
 "id": "Container_A1DC1C15_B547_558B_41DB_85399D84BF5D",
 "scrollBarMargin": 2,
 "width": "17.591%",
 "right": "0.24%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "height": "26.452%",
 "gap": 10,
 "minWidth": 1,
 "bottom": "20.33%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "hidden",
 "minHeight": 1,
 "paddingTop": 0,
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "data": {
  "name": "Container20934"
 }
},
{
 "children": [
  "this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95F",
  "this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C",
  "this.MapViewer"
 ],
 "id": "Container_AF65A9AF_B5C6_DE2D_41B0_64E448626E9A",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "100%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "top": "0%",
 "propagateClick": false,
 "minHeight": 1,
 "height": "53.005%",
 "gap": 10,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "Container40718"
 }
},
{
 "children": [
  "this.Image_BCF4ECA5_B347_35CF_41C3_89BD9EA198D2"
 ],
 "id": "Container_A02FBFA6_B2DA_D281_41DD_61215F8DF26E",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "20%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "height": "25%",
 "gap": 10,
 "minWidth": 1,
 "bottom": "0%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "paddingTop": 0,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "data": {
  "name": "container logo"
 }
},
{
 "children": [
  "this.Container_A33A255B_B34E_D779_41C4_87290D502C89"
 ],
 "id": "Container_BDA5AD02_B347_D4BA_41DC_ACA78CD343CA",
 "scrollBarMargin": 2,
 "width": "75%",
 "right": "0%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "height": "23%",
 "gap": 10,
 "minWidth": 1,
 "bottom": "0%",
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "minHeight": 1,
 "paddingTop": 0,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "data": {
  "name": "CONTAINER 02"
 }
},
{
 "children": [
  "this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463"
 ],
 "id": "Container_A7A78BFA_B2CB_F284_41B6_D2A33200B385",
 "left": "0%",
 "scrollBarMargin": 2,
 "width": "17.122%",
 "verticalAlign": "top",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "class": "Container",
 "contentOpaque": false,
 "top": "0%",
 "propagateClick": false,
 "minHeight": 1,
 "height": "74.775%",
 "gap": 10,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "scroll",
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "left",
 "data": {
  "name": "conrainer view control"
 }
},
{
 "fontFamily": "Montserrat",
 "horizontalAlign": "center",
 "id": "Button_A3532BFB_B3C7_730A_41DD_8C04069188F9",
 "shadowBlurRadius": 15,
 "width": 150,
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundOpacity": 0.26,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#CCCCCC",
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "borderRadius": 5,
 "rollOverShadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": 40,
 "fontSize": "18px",
 "minWidth": 1,
 "mode": "push",
 "borderSize": 2,
 "paddingBottom": 0,
 "label": "CONTACT US",
 "rollOverBackgroundColor": [
  "#0066FF"
 ],
 "paddingTop": 0,
 "iconHeight": 0,
 "gap": 5,
 "fontStyle": "normal",
 "layout": "horizontal",
 "iconBeforeLabel": true,
 "click": "if(!this.Image_A72BE303_B546_F38E_41DE_54F34B520AE6.get('visible')){ this.setComponentVisibility(this.Image_A72BE303_B546_F38E_41DE_54F34B520AE6, true, 0, null, null, false) } else { this.setComponentVisibility(this.Image_A72BE303_B546_F38E_41DE_54F34B520AE6, false, 0, null, null, false) }; if(!this.IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887.get('visible')){ this.setComponentVisibility(this.IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887, true, 0, null, null, false) } else { this.setComponentVisibility(this.IconButton_A35E7096_B53E_EEC0_41E5_2DCCF419F887, false, 0, null, null, false) }; if(!this.IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987.get('visible')){ this.setComponentVisibility(this.IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987, true, 0, null, null, false) } else { this.setComponentVisibility(this.IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987, false, 0, null, null, false) }; if(!this.IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C.get('visible')){ this.setComponentVisibility(this.IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C, true, 0, null, null, false) } else { this.setComponentVisibility(this.IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C, false, 0, null, null, false) }",
 "pressedBackgroundColor": [
  "#0066FF"
 ],
 "shadow": false,
 "iconWidth": 0,
 "backgroundColorDirection": "vertical",
 "fontWeight": "bold",
 "textDecoration": "none",
 "fontColor": "#FFFFFF",
 "cursor": "hand",
 "data": {
  "name": "CONTACT US "
 },
 "pressedBackgroundOpacity": 1
},
{
 "fontFamily": "Montserrat",
 "horizontalAlign": "center",
 "id": "Button_A328AA9A_B3C9_DD09_41E0_033731F29BBC",
 "shadowBlurRadius": 15,
 "width": 150,
 "verticalAlign": "middle",
 "shadowColor": "#000000",
 "paddingRight": 0,
 "rollOverBackgroundOpacity": 0.8,
 "backgroundOpacity": 0.26,
 "paddingLeft": 0,
 "shadowSpread": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderColor": "#000000",
 "minHeight": 1,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "borderRadius": 5,
 "rollOverShadow": false,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": false,
 "height": 40,
 "fontSize": "18px",
 "minWidth": 1,
 "mode": "push",
 "borderSize": 2,
 "paddingBottom": 0,
 "label": "FLOOR PLAN ",
 "rollOverBackgroundColor": [
  "#0066FF"
 ],
 "paddingTop": 0,
 "iconHeight": 0,
 "gap": 5,
 "fontStyle": "normal",
 "layout": "horizontal",
 "iconBeforeLabel": true,
 "click": "if(!this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95F.get('visible')){ this.setComponentVisibility(this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95F, true, 0, null, null, false) } else { this.setComponentVisibility(this.ViewerAreaLabeled_AEB115BE_B5C9_D62C_41BE_5FAE902DD95F, false, 0, null, null, false) }; if(!this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C.get('visible')){ this.setComponentVisibility(this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C, true, 0, null, null, false) } else { this.setComponentVisibility(this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C, false, 0, null, null, false) }; if(!this.MapViewer.get('visible')){ this.setComponentVisibility(this.MapViewer, true, 0, null, null, false) } else { this.setComponentVisibility(this.MapViewer, false, 0, null, null, false) }",
 "pressedBackgroundColor": [
  "#0066FF"
 ],
 "shadow": false,
 "iconWidth": 0,
 "backgroundColorDirection": "vertical",
 "fontWeight": "bold",
 "textDecoration": "none",
 "fontColor": "#FFFFFF",
 "cursor": "hand",
 "data": {
  "name": "FLOOR PLM"
 },
 "pressedBackgroundOpacity": 1
},
{
 "maxHeight": 869,
 "maxWidth": 1380,
 "id": "Image_A72BE303_B546_F38E_41DE_54F34B520AE6",
 "width": "90.368%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_A72BE303_B546_F38E_41DE_54F34B520AE6.png",
 "borderRadius": 0,
 "class": "Image",
 "minHeight": 1,
 "propagateClick": false,
 "height": "98.477%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "visible": false,
 "horizontalAlign": "center",
 "data": {
  "name": "contact us"
 }
},
{
 "maxHeight": 921,
 "maxWidth": 1302,
 "id": "Image_AE897C89_B549_76C1_41D3_DF0C8FDC37F6",
 "width": "100%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_AE897C89_B549_76C1_41D3_DF0C8FDC37F6.png",
 "borderRadius": 0,
 "class": "Image",
 "minHeight": 1,
 "propagateClick": false,
 "height": "0.426%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "horizontalAlign": "center",
 "data": {
  "name": "Image34970"
 }
},
{
 "maxHeight": 70,
 "maxWidth": 70,
 "id": "IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987",
 "width": 70,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 1,
 "propagateClick": false,
 "height": 70,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987.png",
 "click": "this.openLink('https://www.google.com/maps/place/CMED+Construction+Company/@11.545053,104.9226728,17z/data=!4m5!3m4!1s0x3109511f5b8af5a9:0x7e215fce7b5af38c!8m2!3d11.5450478!4d104.9248668', '_blank')",
 "mode": "push",
 "shadow": false,
 "pressedIconURL": "skin/IconButton_AC4DDB95_B53A_D2C0_41E6_62044AE8D987_pressed.png",
 "visible": false,
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "MAP"
 }
},
{
 "maxHeight": 70,
 "maxWidth": 70,
 "id": "IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C",
 "width": 71,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "borderRadius": 0,
 "class": "IconButton",
 "minHeight": 1,
 "propagateClick": false,
 "height": 67,
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "transparencyActive": true,
 "paddingTop": 0,
 "iconURL": "skin/IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C.png",
 "click": "this.openLink('https://www.linkedin.com/company/cmedcc', '_blank')",
 "mode": "push",
 "shadow": false,
 "pressedIconURL": "skin/IconButton_A34104B3_B539_36C0_41DF_89D1C2CF722C_pressed.png",
 "visible": false,
 "cursor": "hand",
 "horizontalAlign": "center",
 "data": {
  "name": "LINKIN"
 }
},
{
 "fontFamily": "Arial",
 "data": {
  "name": "DropDown1204"
 },
 "id": "DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C",
 "left": "3.55%",
 "popUpBorderRadius": 0,
 "popUpShadowColor": "#000000",
 "arrowBeforeLabel": false,
 "paddingRight": 5,
 "popUpShadowSpread": 1,
 "backgroundOpacity": 0.72,
 "paddingLeft": 5,
 "popUpShadowOpacity": 0,
 "width": "90.843%",
 "rollOverPopUpBackgroundColor": "#FFFFFF",
 "popUpGap": 0,
 "minHeight": 20,
 "class": "DropDown",
 "selectedPopUpBackgroundColor": "#0066FF",
 "borderRadius": 4,
 "playList": "this.DropDown_AE83DEC8_B5CB_5257_41E4_4312457CAF6C_playlist",
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": false,
 "backgroundColor": [
  "#00CCFF",
  "#0099FF"
 ],
 "top": "5.98%",
 "fontSize": 14,
 "gap": 0,
 "minWidth": 200,
 "borderSize": 0,
 "height": "6.186%",
 "paddingBottom": 0,
 "popUpBackgroundOpacity": 0.72,
 "paddingTop": 0,
 "popUpShadow": false,
 "fontStyle": "normal",
 "popUpFontColor": "#000000",
 "popUpBackgroundColor": "#FFFFFF",
 "selectedPopUpFontColor": "#FFFFFF",
 "shadow": false,
 "visible": false,
 "fontWeight": "normal",
 "textDecoration": "none",
 "fontColor": "#333333",
 "backgroundColorDirection": "vertical",
 "arrowColor": "#0066FF",
 "popUpShadowBlurRadius": 6
},
{
 "maxHeight": 85,
 "maxWidth": 214,
 "id": "Image_BCF4ECA5_B347_35CF_41C3_89BD9EA198D2",
 "width": "75%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "url": "skin/Image_BCF4ECA5_B347_35CF_41C3_89BD9EA198D2.png",
 "borderRadius": 0,
 "class": "Image",
 "minHeight": 1,
 "propagateClick": false,
 "height": "30%",
 "minWidth": 1,
 "borderSize": 0,
 "paddingBottom": 0,
 "paddingTop": 0,
 "scaleMode": "fit_inside",
 "shadow": false,
 "horizontalAlign": "center",
 "data": {
  "name": "Logo CMED"
 }
},
{
 "children": [
  "this.IconButton_A33AD55A_B34E_D77B_41DD_E828682BEC08",
  "this.IconButton_A33AC55A_B34E_D77B_41CB_790C7C00F30B",
  "this.IconButton_A33AF55A_B34E_D77B_41B6_6D0880405734",
  "this.IconButton_A33AE55A_B34E_D77B_41E1_7B4FCB448F85",
  "this.Container_A33A955A_B34E_D77B_41E2_F466A17EC4B3",
  "this.IconButton_A33A555B_B34E_D779_41E2_B4C0923C2D09",
  "this.IconButton_A33A755B_B34E_D779_41D0_F53AE4560B89",
  "this.IconButton_A33A155B_B34E_D779_41E5_815C89264E42",
  "this.IconButton_A33A355B_B34E_D779_41CA_01BF82F730E3"
 ],
 "id": "Container_A33A255B_B34E_D779_41C4_87290D502C89",
 "scrollBarMargin": 2,
 "width": "47.91%",
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "borderRadius": 9,
 "class": "Container",
 "contentOpaque": false,
 "propagateClick": false,
 "minHeight": 20,
 "height": "100%",
 "gap": 4,
 "minWidth": 381,
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "hidden",
 "paddingTop": 0,
 "layout": "horizontal",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.47,
 "horizontalAlign": "center",
 "data": {
  "name": "Bottom Control "
 }
},
{
 "id": "ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463",
 "left": "0%",
 "itemLabelFontFamily": "Arial",
 "width": "100%",
 "verticalAlign": "top",
 "itemBorderRadius": 0,
 "backgroundOpacity": 0,
 "itemThumbnailShadowVerticalLength": 3,
 "paddingLeft": 20,
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "minHeight": 1,
 "class": "ThumbnailList",
 "itemThumbnailBorderRadius": 22,
 "height": "72.461%",
 "playList": "this.ThumbnailList_A3403CCC_B34A_D567_4194_7268DDD66463_playlist",
 "propagateClick": false,
 "itemPaddingLeft": 3,
 "minWidth": 1,
 "borderSize": 0,
 "itemBackgroundOpacity": 0,
 "itemThumbnailShadowSpread": 1,
 "itemPaddingTop": 3,
 "itemThumbnailShadowHorizontalLength": 3,
 "itemBackgroundColor": [],
 "itemBackgroundColorRatios": [],
 "shadow": false,
 "itemThumbnailOpacity": 1,
 "itemVerticalAlign": "middle",
 "rollOverItemLabelFontWeight": "bold",
 "scrollBarMargin": 2,
 "itemThumbnailHeight": 65,
 "itemLabelTextDecoration": "none",
 "itemThumbnailShadowOpacity": 0.57,
 "paddingRight": 20,
 "itemLabelFontWeight": "normal",
 "itemThumbnailScaleMode": "fit_outside",
 "itemLabelFontSize": 14,
 "scrollBarWidth": 10,
 "itemThumbnailShadowBlurRadius": 8,
 "selectedItemLabelFontColor": "#0066FF",
 "borderRadius": 5,
 "itemPaddingRight": 3,
 "itemThumbnailWidth": 149,
 "top": "0%",
 "itemOpacity": 1,
 "itemBackgroundColorDirection": "vertical",
 "gap": 3,
 "paddingBottom": 10,
 "itemLabelFontColor": "#FFFFFF",
 "itemThumbnailShadow": true,
 "paddingTop": 10,
 "itemPaddingBottom": 3,
 "layout": "vertical",
 "scrollBarColor": "#FFFFFF",
 "itemThumbnailShadowColor": "#000000",
 "scrollBarVisible": "rollOver",
 "selectedItemLabelFontWeight": "bold",
 "scrollBarOpacity": 0.5,
 "itemLabelHorizontalAlign": "center",
 "itemLabelGap": 6,
 "itemLabelFontStyle": "normal",
 "itemMode": "normal",
 "horizontalAlign": "left",
 "data": {
  "name": "view control"
 }
},
{
 "children": [
  "this.IconButton_A33A855A_B34E_D778_41D3_081B5F186BCE",
  "this.IconButton_A33AB55B_B34E_D779_41DC_3788F4E6C492",
  "this.IconButton_A33AA55B_B34E_D779_41E1_474ADCB39358"
 ],
 "id": "Container_A33A955A_B34E_D77B_41E2_F466A17EC4B3",
 "scrollBarMargin": 2,
 "width": 40,
 "verticalAlign": "middle",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "paddingLeft": 0,
 "scrollBarWidth": 10,
 "contentOpaque": false,
 "borderRadius": 0,
 "class": "Container",
 "propagateClick": false,
 "minHeight": 20,
 "height": "100%",
 "gap": 4,
 "minWidth": 20,
 "borderSize": 0,
 "paddingBottom": 0,
 "overflow": "hidden",
 "paddingTop": 0,
 "layout": "vertical",
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "horizontalAlign": "center",
 "data": {
  "name": "Container43169"
 }
}],
 "height": "100%",
 "paddingBottom": 0,
 "gap": 10,
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "overflow": "visible",
 "mobileMipmappingEnabled": false,
 "buttonToggleMute": "this.IconButton_A33A155B_B34E_D779_41E5_815C89264E42",
 "layout": "absolute",
 "backgroundPreloadEnabled": true,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "scrollBarOpacity": 0.5,
 "vrPolyfillScale": 0.5,
 "data": {
  "name": "Player492"
 }
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
