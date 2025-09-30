import {useScaleInput} from '@platejs/media/react';

export default function ScaleInput(props: React.ComponentProps<'input'>) {
  const {props: scaleInputProps, ref} = useScaleInput();

  return <input {...scaleInputProps} {...props} ref={ref} />;
}
