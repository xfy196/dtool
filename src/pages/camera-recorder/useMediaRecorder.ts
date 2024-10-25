import { computed, ref, type Ref } from 'vue';
import { createEventHook } from '@vueuse/core';
function useMediaRecorder({
  stream
}: {
  stream: Ref<MediaStream | undefined>;
}): {
  startRecording: () => void;
  stopRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  isRecordingSupported: Ref<boolean>;
  recordingState: Ref<'stopped' | 'recording' | 'paused'>;
  onRecordingEnable: (cb: (url: string) => void) => void;
} {
  const isRecordingSupported = computed(() =>
    MediaRecorder.isTypeSupported('video/webm')
  );
  const mediaRecorder = ref<MediaRecorder | null>(null);
  const recordingChunks = ref<Blob[]>([]);
  const recordingEnable = createEventHook();
  const recordingState = ref<'stopped' | 'recording' | 'paused'>('stopped');
  const startRecording = () => {
    if (!isRecordingSupported.value) return;
    if (!stream.value) return;
    if (recordingState.value !== 'stopped') return;
    mediaRecorder.value = new MediaRecorder(stream.value, {
      mimeType: 'video/webm'
    });
    mediaRecorder.value.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordingChunks.value.push(e.data);
      }
    };
    mediaRecorder.value.onstop = () => {
      // 当停止记录的时候我们需要创建 video 对象
      recordingEnable.trigger(createVideo());
    };
    // 如果 mediaRecorder 状态不可用 直接返回
    if (mediaRecorder.value.state !== 'inactive') return;
    mediaRecorder.value.start();
    recordingState.value = 'recording';
  };
  const stopRecording = () => {
    if (!isRecordingSupported.value) return;
    if (!mediaRecorder.value) return;
    if (recordingState.value === 'stopped') return;
    mediaRecorder.value.stop();
    recordingState.value = 'stopped';
  };
  const pauseRecording = () => {
    if (!isRecordingSupported.value) return;
    if (!mediaRecorder.value) return;
    if (recordingState.value !== 'recording') return;
    mediaRecorder.value.pause();
    recordingState.value = 'paused';
  };
  const resumeRecording = () => {
    if (!isRecordingSupported.value) return;
    if (!mediaRecorder.value) return;
    if (recordingState.value !== 'paused') return;
    mediaRecorder.value.resume();
    recordingState.value = 'recording';
  };
  // 创建存储 video 流的 blob 对象
  const createVideo = () => {
    const blob = new Blob(recordingChunks.value, { type: 'video/webm' });
    const url = URL.createObjectURL(blob);
    recordingChunks.value = [];
    return url;
  };
  return {
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    isRecordingSupported,
    recordingState,
    onRecordingEnable: recordingEnable.on
  };
}
export { useMediaRecorder };
