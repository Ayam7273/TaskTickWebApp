import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';
import Modal from '../../components/ui/Modal.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { HiUser, HiLockClosed, HiLogout, HiMail, HiCalendar } from 'react-icons/hi';

export default function ProfilePage() {
	const { user, signOut, updatePassword } = useAuth();
	const navigate = useNavigate();
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [showDeleteAccount, setShowDeleteAccount] = useState(false);
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const userName = user?.user_metadata?.name || user?.email?.split('@')[0] || 'User';
	const userEmail = user?.email || '';
	const joinedDate = user?.created_at
		? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
		: 'Recently';

	const handleChangePassword = async () => {
		setError('');
		if (newPassword !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		if (newPassword.length < 6) {
			setError('Password must be at least 6 characters');
			return;
		}

		setLoading(true);
		try {
			await updatePassword(newPassword);
			alert('Password changed successfully!');
			setShowChangePassword(false);
			setNewPassword('');
			setConfirmPassword('');
		} catch (err) {
			setError(err.message || 'Failed to change password');
		} finally {
			setLoading(false);
		}
	};

	const handleLogout = async () => {
		if (confirm('Are you sure you want to logout?')) {
			await signOut();
			navigate('/login');
		}
	};

	const handleDeleteAccount = () => {
		// TODO: Implement account deletion with Supabase
		if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
			alert('Account deletion will be implemented with Supabase');
			setShowDeleteAccount(false);
		}
	};

	return (
		<div className="space-y-6">
			<div className="heading-xl">Profile</div>

			{/* Profile Header */}
			<Card className="p-6">
				<div className="flex flex-col items-center text-center">
					<div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
						<HiUser className="w-12 h-12 text-primary" />
					</div>
					<div className="heading-lg mb-1">{userName}</div>
					<div className="text-muted flex items-center gap-2">
						<HiMail className="w-4 h-4" />
						{userEmail}
					</div>
					<div className="text-sm text-muted mt-2 flex items-center gap-2">
						<HiCalendar className="w-4 h-4" />
						Joined {joinedDate}
					</div>
				</div>
			</Card>

			{/* Account Actions */}
			<div className="space-y-3">
				<Card className="p-0 overflow-hidden">
					<button
						onClick={() => setShowChangePassword(true)}
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors"
					>
						<div className="flex items-center gap-3">
							<HiLockClosed className="w-5 h-5 text-muted" />
							<span>Change Password</span>
						</div>
					</button>
					<button
						onClick={handleLogout}
						className="w-full flex items-center justify-between px-4 py-3 hover:bg-white/5 transition-colors border-t border-white/5 text-red-400"
					>
						<div className="flex items-center gap-3">
							<HiLogout className="w-5 h-5" />
							<span>Logout</span>
						</div>
					</button>
				</Card>

				{/* Danger Zone */}
				<Card className="p-4 border border-red-500/20">
					<div className="text-sm font-medium text-red-400 mb-3">Danger Zone</div>
					<Button variant="danger" onClick={() => setShowDeleteAccount(true)} className="w-full">
						Delete Account
					</Button>
				</Card>
			</div>

			{/* Change Password Modal */}
			<Modal open={showChangePassword} onClose={() => setShowChangePassword(false)} title="Change Password">
				<div className="space-y-4">
					{error && <div className="text-red-400 text-sm">{error}</div>}
					<Input
						type="password"
						placeholder="New Password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
					/>
					<Input
						type="password"
						placeholder="Confirm New Password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
					<div className="flex gap-3 pt-4">
						<Button
							variant="ghost"
							onClick={() => {
								setShowChangePassword(false);
								setError('');
								setNewPassword('');
								setConfirmPassword('');
							}}
							className="flex-1"
						>
							Cancel
						</Button>
						<Button onClick={handleChangePassword} className="flex-1" disabled={loading}>
							{loading ? 'Changing...' : 'Change Password'}
						</Button>
					</div>
				</div>
			</Modal>

			{/* Delete Account Modal */}
			<Modal open={showDeleteAccount} onClose={() => setShowDeleteAccount(false)} title="Delete Account">
				<div className="space-y-4">
					<p className="text-muted">
						Are you sure you want to delete your account? This will permanently delete all your tasks,
						settings, and data. This action cannot be undone.
					</p>
					<div className="flex gap-3 pt-4">
						<Button variant="ghost" onClick={() => setShowDeleteAccount(false)} className="flex-1">
							Cancel
						</Button>
						<Button variant="danger" onClick={handleDeleteAccount} className="flex-1">
							Delete Account
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}

