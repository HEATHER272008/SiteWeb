-- Drop the existing public view policy
DROP POLICY IF EXISTS "Public can view active personnel" ON public.personnel;

-- Create a new policy that hides email and phone from public view
-- We'll do this by creating a view instead, but first let's update the policy
-- to be more restrictive - only admins see full data

-- For public access, we'll create a secure view that excludes sensitive columns
CREATE OR REPLACE VIEW public.personnel_public AS
SELECT 
  id,
  name,
  position,
  department,
  description,
  photo_url,
  display_order,
  is_active,
  created_at,
  updated_at
FROM public.personnel
WHERE is_active = true;

-- Grant select on the view to anon and authenticated
GRANT SELECT ON public.personnel_public TO anon, authenticated;

-- Update RLS policy - only admins can see full personnel data (including email/phone)
CREATE POLICY "Public can view active personnel basic info" 
ON public.personnel 
FOR SELECT 
USING (
  is_active = true AND has_role(auth.uid(), 'admin'::app_role)
  OR has_role(auth.uid(), 'admin'::app_role)
);