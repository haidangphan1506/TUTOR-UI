"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";

import { Dialog } from "@/components/ui/dialog-form.ui";
import { Input } from "@/components/ui/input.ui";
import { Select } from "@/components/ui/select.ui";
import { Label } from "@/components/ui/label.ui";
import { usePost } from "@/lib/axios/query";
import { unwrapApiData } from "@/lib/axios/api-unwrap";
import { getErrorMessage } from "@/lib/axios";
import { useFlowRequestsCopy } from "@/hooks/useFlowRequestsCopy.hook";
import { useCommonCopy } from "@/hooks/useCommonCopy.hook";
import { METHOD_OPTIONS, SERVICE_OPTIONS } from "./flow-request-data";
import type {
  FlowRequestFormValues,
  CreateFlowRequestPayload,
  FlowRequestDialogProps,
} from "@/types";

const DEFAULT_VALUES: FlowRequestFormValues = {
  method: "GET",
  fePath: "",
  gwPath: "",
  topic: "",
  service: "tutor-service",
  domain: "",
  gwController: "",
};

export function AddFlowRequestDialog({
  open,
  onClose,
  onSaved,
}: FlowRequestDialogProps) {
  const copy = useFlowRequestsCopy();
  const common = useCommonCopy();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FlowRequestFormValues>({ defaultValues: DEFAULT_VALUES });

  useEffect(() => {
    if (!open) reset(DEFAULT_VALUES);
  }, [open, reset]);

  const createMutation = usePost<unknown, CreateFlowRequestPayload>(
    "/flow-requests",
  );

  const onSubmit = (values: FlowRequestFormValues) => {
    const payload: CreateFlowRequestPayload = {
      m: values.method,
      fePath: values.fePath.trim(),
      gwPath: values.gwPath.trim() || values.fePath.trim(),
      topic: values.topic.trim(),
      svc: values.service,
      domain: values.domain.trim(),
      gwCtrl: values.gwController.trim() || values.domain.trim(),
    };

    createMutation.mutate(payload, {
      onSuccess: (raw) => {
        unwrapApiData(raw);
        toast.success(copy.addDialog.toastSuccess);
        onSaved();
        onClose();
      },
      onError: (error) => {
        toast.error(getErrorMessage(error, copy.addDialog.toastError));
      },
    });
  };

  return (
    <Dialog
      isOpen={open}
      icon={Plus}
      title={copy.addDialog.title}
      subtitle={copy.addDialog.subtitle}
      className="max-w-2xl"
      cancelText={common.actions.cancel}
      onCancel={onClose}
      submitText={copy.addDialog.submitText}
      submitIcon={Check}
      onSubmit={handleSubmit(onSubmit)}
      loading={createMutation.isPending}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col gap-5"
      >
        {/* Row 1: Method + Domain */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>
              {copy.addDialog.methodLabel}
              <span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Controller
              name="method"
              control={control}
              render={({ field }) => (
                <Select
                  options={METHOD_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>
              {copy.addDialog.domainLabel}
              <span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Input
              {...register("domain", {
                required: copy.addDialog.errDomainRequired,
              })}
              placeholder={copy.addDialog.domainPlaceholder}
              invalid={!!errors.domain}
            />
            {errors.domain && (
              <p className="text-xs text-destructive">
                {errors.domain.message}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: FE Path + GW Path */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>
              {copy.addDialog.fePathLabel}
              <span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Input
              {...register("fePath", {
                required: copy.addDialog.errFePathRequired,
              })}
              placeholder={copy.addDialog.fePathPlaceholder}
              invalid={!!errors.fePath}
            />
            {errors.fePath && (
              <p className="text-xs text-destructive">
                {errors.fePath.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{copy.addDialog.gwPathLabel}</Label>
            <Input
              {...register("gwPath")}
              placeholder={copy.addDialog.gwPathPlaceholder}
            />
          </div>
        </div>

        {/* Row 3: Topic + Service */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <Label>
              {copy.addDialog.topicLabel}
              <span className="ml-0.5 text-destructive">*</span>
            </Label>
            <Input
              {...register("topic", {
                required: copy.addDialog.errTopicRequired,
              })}
              placeholder={copy.addDialog.topicPlaceholder}
              invalid={!!errors.topic}
            />
            {errors.topic && (
              <p className="text-xs text-destructive">
                {errors.topic.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>{copy.addDialog.serviceLabel}</Label>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
                <Select
                  options={SERVICE_OPTIONS}
                  value={field.value}
                  onValueChange={field.onChange}
                  placeholder={copy.addDialog.servicePlaceholder}
                />
              )}
            />
          </div>
        </div>

        {/* Row 4: GW Controller */}
        <div className="flex flex-col gap-1.5">
          <Label>{copy.addDialog.gwControllerLabel}</Label>
          <Input
            {...register("gwController")}
            placeholder={copy.addDialog.gwControllerPlaceholder}
          />
        </div>
      </form>
    </Dialog>
  );
}
