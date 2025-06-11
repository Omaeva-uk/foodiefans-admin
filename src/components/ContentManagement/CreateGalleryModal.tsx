import React, { useState } from "react";

interface CreateGalleryModalProps {
  closeModal: () => void;
  onCreate: (data: {
    galleryTitle: string;
    creatorName: string;
    photosCount: number;
  }) => void;
}

const CreateGalleryModal: React.FC<CreateGalleryModalProps> = ({ closeModal, onCreate }) => {
  const [formValues, setFormValues] = useState({
    galleryTitle: "",
    creatorName: "",
    photosCount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({
      galleryTitle: formValues.galleryTitle,
      creatorName: formValues.creatorName,
      photosCount: Number(formValues.photosCount),
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-[90vw] md:w-[400px] shadow-xl">
        <h2 className="text-xl font-bold mb-4 text-[#028b6e]">Create New Gallery</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="galleryTitle"
            placeholder="Gallery Title"
            value={formValues.galleryTitle}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#028b6e]"
            required
          />
          <input
            type="text"
            name="creatorName"
            placeholder="Creator Name"
            value={formValues.creatorName}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#028b6e]"
            required
          />
          <input
            type="number"
            name="photosCount"
            placeholder="Number of Photos"
            value={formValues.photosCount}
            onChange={handleChange}
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#028b6e]"
            required
          />
          <div className="flex gap-3 mt-4">
            <button
              type="submit"
              className="w-full bg-[#028b6e] hover:bg-[#026655] text-white py-2 rounded-xl font-bold"
            >
              Create
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="w-full border border-[#028b6e] text-[#028b6e] hover:bg-gray-100 py-2 rounded-xl font-bold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateGalleryModal;
