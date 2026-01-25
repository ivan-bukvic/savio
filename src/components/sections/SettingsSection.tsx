import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, Lock, CreditCard, Trash2, Loader2, Crown, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SettingsSectionProps {
  userId: string;
  userEmail: string;
  isPro: boolean;
  onUpgrade: () => void;
}

export const SettingsSection = ({ userId, userEmail, isPro, onUpgrade }: SettingsSectionProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Profile state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(userEmail);
  const [profileLoading, setProfileLoading] = useState(true);
  const [profileSaving, setProfileSaving] = useState(false);
  
  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordSaving, setPasswordSaving] = useState(false);
  
  // Delete account state
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("user_id", userId)
        .maybeSingle();

      if (error) {
        console.error("Error fetching profile:", error);
      } else if (data?.full_name) {
        const nameParts = data.full_name.split(" ");
        setFirstName(nameParts[0] || "");
        setLastName(nameParts.slice(1).join(" ") || "");
      }
      setProfileLoading(false);
    };

    fetchProfile();
  }, [userId]);

  // Update profile
  const handleUpdateProfile = async () => {
    if (!firstName.trim()) {
      toast({
        title: "Validation Error",
        description: "First name is required.",
        variant: "destructive",
      });
      return;
    }

    setProfileSaving(true);
    
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    
    const { error: profileError } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("user_id", userId);

    if (profileError) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
      setProfileSaving(false);
      return;
    }

    // Update email if changed
    if (email !== userEmail) {
      const { error: emailError } = await supabase.auth.updateUser({
        email: email,
      });

      if (emailError) {
        toast({
          title: "Error",
          description: emailError.message,
          variant: "destructive",
        });
        setProfileSaving(false);
        return;
      }

      toast({
        title: "Verification Email Sent",
        description: "Please check your new email address to confirm the change.",
      });
    } else {
      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
    }

    setProfileSaving(false);
  };

  // Change password
  const handleChangePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast({
        title: "Validation Error",
        description: "Please fill in all password fields.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Validation Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Validation Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }

    setPasswordSaving(true);

    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Password Updated",
        description: "Your password has been changed successfully.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    }

    setPasswordSaving(false);
  };

  // Delete account
  const handleDeleteAccount = async () => {
    setDeleteLoading(true);

    try {
      // Delete user data from all tables
      await Promise.all([
        supabase.from("income").delete().eq("user_id", userId),
        supabase.from("expenses").delete().eq("user_id", userId),
        supabase.from("savings_goals").delete().eq("user_id", userId),
        supabase.from("debts").delete().eq("user_id", userId),
        supabase.from("ai_reports").delete().eq("user_id", userId),
        supabase.from("profiles").delete().eq("user_id", userId),
      ]);

      // Sign out and redirect
      await supabase.auth.signOut();
      
      toast({
        title: "Account Deleted",
        description: "Your account has been deleted. Redirecting...",
      });

      navigate("/auth");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete account. Please contact support.",
        variant: "destructive",
      });
      setDeleteLoading(false);
    }
  };

  if (profileLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm md:text-base text-muted-foreground">Manage your account preferences and profile.</p>
      </div>

      <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
        {/* Profile Information */}
        <Card className="card-shadow border-t-4 border-l-0 border-r-0 border-b-0 border-t-primary">
          <CardHeader className="p-4 md:pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-primary/10">
                <User className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg">Profile Information</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Update your personal details
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-sm">First Name</Label>
                <Input
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-sm">Last Name</Label>
                <Input
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="text-sm"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="text-sm"
              />
              {email !== userEmail && (
                <p className="text-xs text-muted-foreground">
                  A verification email will be sent to confirm the change.
                </p>
              )}
            </div>
            <Button 
              onClick={handleUpdateProfile} 
              disabled={profileSaving}
              className="w-full"
            >
              {profileSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card className="card-shadow border-t-4 border-l-0 border-r-0 border-b-0 border-t-primary">
          <CardHeader className="p-4 md:pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-primary/10">
                <Lock className="h-4 w-4 md:h-5 md:w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg">Change Password</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Update your account password
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword" className="text-sm">Current Password</Label>
              <Input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="text-sm"
              />
            </div>
            <Button 
              onClick={handleChangePassword} 
              disabled={passwordSaving}
              className="w-full"
            >
              {passwordSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </CardContent>
        </Card>

        {/* Subscription Status */}
        <Card className={cn(
          "card-shadow border-t-4 border-l-0 border-r-0 border-b-0",
          isPro ? "border-t-gold" : "border-t-muted-foreground"
        )}>
          <CardHeader className="p-4 md:pb-4">
            <div className="flex items-center gap-3">
              <div className={cn(
                "flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg",
                isPro ? "bg-gold/10" : "bg-muted"
              )}>
                {isPro ? (
                  <Crown className="h-4 w-4 md:h-5 md:w-5 text-gold" />
                ) : (
                  <CreditCard className="h-4 w-4 md:h-5 md:w-5 text-muted-foreground" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-base md:text-lg">Subscription Status</CardTitle>
                  {isPro && (
                    <span className="text-xs font-semibold text-gold bg-gold/10 px-2 py-0.5 rounded-full">
                      PRO
                    </span>
                  )}
                </div>
                <CardDescription className="text-xs md:text-sm">
                  Manage your subscription plan
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className={cn(
              "rounded-lg p-4",
              isPro ? "bg-gold/5 border border-gold/20" : "bg-muted/50"
            )}>
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm md:text-base text-foreground">
                    {isPro ? "Pro Plan" : "Free Plan"}
                  </p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {isPro 
                      ? "Full access to all features" 
                      : "Upgrade for AI insights"}
                  </p>
                </div>
                {isPro && (
                  <Crown className="h-6 w-6 md:h-8 md:w-8 text-gold shrink-0" />
                )}
              </div>
            </div>
            {!isPro && (
              <Button 
                onClick={onUpgrade}
                className="w-full bg-gold hover:bg-gold/90 text-gold-foreground"
              >
                <Crown className="mr-2 h-4 w-4" />
                Upgrade to Pro
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="card-shadow border-t-4 border-l-0 border-r-0 border-b-0 border-t-destructive">
          <CardHeader className="p-4 md:pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-destructive/10">
                <Trash2 className="h-4 w-4 md:h-5 md:w-5 text-destructive" />
              </div>
              <div>
                <CardTitle className="text-base md:text-lg text-destructive">Danger Zone</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                  Permanently delete your account
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-4">
            <div className="rounded-lg p-3 md:p-4 bg-destructive/5 border border-destructive/20">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs md:text-sm text-foreground font-medium">Warning</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Deleting your account is permanent. All your data including income, expenses, goals, and AI reports will be deleted forever.
                  </p>
                </div>
              </div>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="destructive" 
                  disabled={deleteLoading}
                  className="w-full"
                >
                  {deleteLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, delete my account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
