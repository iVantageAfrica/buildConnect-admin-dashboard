
import React from 'react';
import { Building2, User, Calendar } from 'lucide-react';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardLayout from '../DashboardLayout/DashboardLayout';
import { URLS } from '@/libs/constants/pageurl';
import BackButton from '@/components/ui/BackButton';
import { useProjects } from '@/libs/hooks/useProjects';
import IconInputField from '@/components/ui/Forms/IconInputField';
import IconDropdown from '@/components/ui/Forms/IconInputDropdown';
import DatePicker from '@/components/ui/Forms/Datepicker';
import IconTextarea from '@/components/ui/Forms/IconTextArea';
import { ProjectFormData, projectSchema } from '@/libs/schema/projectschema';
import Button from '@/components/ui/Button/Button';

export default function CreateProjectForm() {
  const { createProjectMutation } = useProjects();

  const methods = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projectName: '',
      budget: '',
      client: '',
      builder: '',
      startDate: '',
      endDate: '',
      location: '',
      description: ''
    },
    mode: "onChange"
  });

  const {
    handleSubmit,
    formState: { errors, isValid },
    reset,
    control,
  } = methods;

  const onSubmit = (data: ProjectFormData) => {
    createProjectMutation.mutate(data);
  };

  const handleCancel = () => {
    reset();
  };

  const clientOptions = [
    { value: 'client1', label: 'John Doe' },
    { value: 'client2', label: 'Jane Smith' },
    { value: 'client3', label: 'Mike Johnson' },
  ];

  const builderOptions = [
    { value: 'builder1', label: 'ABC Construction' },
    { value: 'builder2', label: 'XYZ Builders' },
    { value: 'builder3', label: 'Elite Constructions' },
  ];

  const locationOptions = [
    { value: 'lagos', label: 'Lagos' },
    { value: 'abuja', label: 'Abuja' },
    { value: 'port-harcourt', label: 'Port Harcourt' },
    { value: 'ibadan', label: 'Ibadan' },
  ];

  return (
    <FormProvider {...methods}>
      <DashboardLayout urlpath={URLS.DASHBOARD.PROJECTS}>
        <BackButton/>
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
          Create Projects
        </h1>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Row 1: Project Name and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="projectName"
              control={control}
              render={({ field }) => (
                <IconInputField
                  label="Project Name"
                  id="projectName"
                  placeholder="e.g, Shoprite Mall Bridge"
                  icon={<Building2 />}
                  error={errors.projectName?.message}
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="budget"
              control={control}
              render={({ field }) => (
                <IconInputField
                  label="Budget"
                  id="budget"
                  placeholder="1,000,000,000"
                  icon={<Building2 />}
                  currency
                  error={errors.budget?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>

          {/* Row 2: Assign Client and Builder */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="client"
              control={control}
              render={({ field }) => (
                <IconDropdown
                  label="Assign Client"
                  id="client"
                  options={clientOptions}
                  icon={<User />}
                  error={errors.client?.message}
                  required
                  placeholder="Select a client"
                  {...field}
                />
              )}
            />

            <Controller
              name="builder"
              control={control}
              render={({ field }) => (
                <IconDropdown
                  label="Assign Builder"
                  id="builder"
                  options={builderOptions}
                  icon={<Building2 />}
                  error={errors.builder?.message}
                  required
                  placeholder="Select a builder"
                  {...field}
                />
              )}
            />
          </div>

          {/* Row 3: Start Date and End Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Controller
              name="startDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Start Date"
                  placeholder="Select start date"
                  error={errors.startDate?.message}
                  required
                  {...field}
                />
              )}
            />

            <Controller
              name="endDate"
              control={control}
              render={({ field }) => (
                <DatePicker
                  label="Estimated End Date"
                  placeholder="Select end date"
                  error={errors.endDate?.message}
                  required
                  {...field}
                />
              )}
            />
          </div>

          {/* Row 4: Location */}
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <IconDropdown
                label="Location"
                id="location"
                options={locationOptions}
                icon={<Building2 />}
                error={errors.location?.message}
                required
                placeholder="Select project location"
                {...field}
              />
            )}
          />

          {/* Row 5: Description */}
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <IconTextarea
                label="Description"
                id="description"
                placeholder="Enter brief description...."
                rows={6}
                error={errors.description?.message}
                required
                {...field}
              />
            )}
          />

          {/* Buttons */}
          <div className="flex">
            <Button 
              type="submit"
              loading={createProjectMutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 mb-6"
            >
              Create project
            </Button>
          </div>
        </form>
      </DashboardLayout>
    </FormProvider>
  );
}