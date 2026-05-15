import React, { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw, ExternalLink } from 'lucide-react';

export const ImageGalleryModal = ({ images, initialIndex = 0, open, onClose, currentMetaList = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  const minZoom = 1;
  const maxZoom = 3;

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetTransform();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetTransform();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handlePrevious();
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'Escape') onClose();
  };

  const resetTransform = () => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  };

  const zoomIn = () => setZoom((z) => Math.min(maxZoom, +(z + 0.25).toFixed(2)));
  const zoomOut = () => setZoom((z) => Math.max(minZoom, +(z - 0.25).toFixed(2)));

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = Math.sign(e.deltaY);
    if (delta > 0) {
      zoomOut();
    } else {
      zoomIn();
    }
  };

  const onMouseDown = (e) => {
    if (zoom === 1) return;
    setDragging(true);
    setStart({ x: e.clientX - offset.x, y: e.clientY - offset.y });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setOffset({ x: e.clientX - start.x, y: e.clientY - start.y });
  };

  const endDrag = () => setDragging(false);

  React.useEffect(() => {
    if (open) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [open, currentIndex]);

  React.useEffect(() => {
    setCurrentIndex(initialIndex);
    resetTransform();
  }, [initialIndex, open]);

  if (!images || images.length === 0) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[90vh] p-0 bg-black">
        <div className="relative w-full h-full flex items-center justify-center select-none">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-50 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Zoom Controls */}
          <div className="absolute top-4 left-4 z-50 flex gap-2">
            <button onClick={zoomOut} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 disabled:opacity-50" disabled={zoom <= minZoom}>
              <ZoomOut className="h-5 w-5" />
            </button>
            <button onClick={zoomIn} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2 disabled:opacity-50" disabled={zoom >= maxZoom}>
              <ZoomIn className="h-5 w-5" />
            </button>
            <button onClick={resetTransform} className="bg-white/10 hover:bg-white/20 text-white rounded-full p-2">
              <RotateCcw className="h-5 w-5" />
            </button>
          </div>

          {/* Previous Button */}
          {images.length > 1 && (
            <button
              onClick={handlePrevious}
              className="absolute left-4 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
          )}

          {/* Image Canvas */}
          <div
            className={`w-full h-full flex items-center justify-center p-8 ${dragging ? 'cursor-grabbing' : zoom > 1 ? 'cursor-grab' : 'cursor-default'}`}
            onWheel={handleWheel}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={endDrag}
            onMouseLeave={endDrag}
          >
            <img
              src={images[currentIndex]}
              alt={`Gallery image ${currentIndex + 1}`}
              className="max-w-none max-h-none"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transition: dragging ? 'none' : 'transform 120ms ease-out',
                willChange: 'transform',
                maxWidth: zoom === 1 ? '100%' : 'none',
                maxHeight: zoom === 1 ? '100%' : 'none',
              }}
            />
          </div>

          {/* Next Button */}
          {images.length > 1 && (
            <button
              onClick={handleNext}
              className="absolute right-4 z-40 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>
          )}

          {/* View Property button if item has link */}
          {currentMetaList[currentIndex]?.link && (
            <a
              href={currentMetaList[currentIndex].link}
              className="absolute bottom-4 left-4 z-50 bg-white/90 hover:bg-white text-stone-800 rounded-full px-4 py-2 text-sm flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" /> View property
            </a>
          )}

          {/* Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/10 text-white px-4 py-2 rounded-full text-sm">
              {currentIndex + 1} / {images.length}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageGalleryModal;
