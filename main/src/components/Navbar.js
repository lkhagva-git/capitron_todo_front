import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { useAuth } from '../contexts/AuthContext'
import { Modal } from 'antd'
import { useState } from 'react'
import Profile from '../pages/Profile'

const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}


export default function Navbar() {
    const { logout, auth } = useAuth();

    const [firstModalOpen, setFirstModalOpen] = useState(false);

    const modalHandleCancel = () => {
        setFirstModalOpen(false);
    };

    return (
        <>

            <Modal title="Хэрэглэгчийн дэлгэрэнгүй" open={firstModalOpen} onCancel={modalHandleCancel} footer={null}>
                <Profile />
            </Modal>


            <Disclosure as="nav" className="bg-gray-800">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between">
                        <div className="flex items-center">
                            <div className="shrink-0">
                                <img
                                    alt="Your Company"
                                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                    className="size-8"
                                />
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4 text-white">
                                    Тавтай морилно уу 
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-4 flex items-center md:ml-6">
                                {/* Profile dropdown */}
                                <Menu as="div" className="relative ml-3">
                                    <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt=""
                                            src={user.imageUrl}
                                            className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                                        />
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem key={'profile'}>
                                            <DisclosureButton
                                                key={'Profile'}
                                                as="a"
                                                onClick={() => { setFirstModalOpen(true); }}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-teal-800"
                                            >
                                                Profile
                                            </DisclosureButton>

                                        </MenuItem>
                                        <MenuItem key={'signout'}>
                                            <DisclosureButton
                                                key={'signout'}
                                                as="a"
                                                onClick={() => { logout(); }}
                                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-teal-800"
                                            >
                                                Sign Out
                                            </DisclosureButton>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            {/* Mobile menu button */}
                            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                <span className="absolute -inset-0.5" />
                                <span className="sr-only">Open main menu</span>
                                <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>

                <DisclosurePanel className="md:hidden">
                    <div className="border-t border-white/10 pt-4 pb-3">
                        <div className="flex items-center px-5">
                            <div className="shrink-0">
                                <img
                                    alt=""
                                    src={user.imageUrl}
                                    className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                                />
                            </div>
                            <div className="ml-3">
                                <div className="text-base/5 font-medium text-white">{auth?.profile?.first_name}</div>
                                <div className="text-sm font-medium text-gray-400">{auth?.profile?.email}</div>
                            </div>
                        </div>
                        <div className="mt-3 space-y-1 px-2">
                            <DisclosureButton
                                key={'Profile'}
                                as="a"
                                onClick={() => { setFirstModalOpen(true); }}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                            >
                                Profile
                            </DisclosureButton>
                            <DisclosureButton
                                key={'signout'}
                                as="a"
                                onClick={() => { logout(); }}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                            >
                                Sign Out
                            </DisclosureButton>
                        </div>
                    </div>
                </DisclosurePanel>
            </Disclosure >

            <header className="relative bg-white shadow-sm">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">To Do app</h1>
                </div>
            </header>

        </>
    )
}
