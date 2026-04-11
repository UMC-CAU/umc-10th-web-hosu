import { useState } from "react";

interface UseFormProps<T> {
  initialValues: T;
  validate: (values: T) => Partial<Record<keyof T, string>>;
}

function useForm<T>({ initialValues, validate }: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({}); // 발생한 에러만 partial로 선택해서 넣기
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({}); // 해당 input을 건드린 적 있는지 추적

  const handleChange = (name: keyof T, value: string) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);

    if (touched[name]) {
      const newErrors = validate(newValues);
      setErrors(newErrors);
    }
  };

  const handleBlur = (name: keyof T) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validate(values);
    setErrors(newErrors);
  };

  const getInputProps = (name: keyof T) => ({
    value: values[name] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      handleChange(name, e.target.value),
    onBlur: () => handleBlur(name),
  });

  const isValid =
    Object.values(values as Record<string, string>).every((v) => v.length > 0) &&
    Object.keys(validate(values)).length === 0;

  return { values, errors, touched, getInputProps, isValid };
}

export default useForm;
