-- Drop the security definer view
DROP VIEW IF EXISTS public.personnel_public;

-- Drop the overly complex policy
DROP POLICY IF EXISTS "Public can view active personnel basic info" ON public.personnel;

-- Create a simple policy: public can view active personnel (basic info handled in frontend)
CREATE POLICY "Public can view active personnel" 
ON public.personnel 
FOR SELECT 
USING (is_active = true);