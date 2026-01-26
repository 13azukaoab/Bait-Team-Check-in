        // Initialize Map
        const map = L.map('map').setView([13.7400, 100.5400], 13);
        
        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);

        // Initialize Map View (Second Map)
        let mapView = null;
        let mapViewLayers = [];

        function initMapView() {
            if (!mapView) {
                mapView = L.map('map-view').setView([13.7400, 100.5400], 13);
                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    attribution: '© OpenStreetMap contributors'
                }).addTo(mapView);
                
                // Add click handler for Map View distance measurement
                mapView.on('click', function(e) {
                    if (!measureModeFull) return;
                    
                    const pointNum = measurePointsFull.length + 1;
                    const pointIcon = L.divIcon({
                        className: 'measure-point',
                        html: `<div style="background: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">${pointNum}</div>`,
                        iconSize: [24, 24],
                        iconAnchor: [12, 12]
                    });
                    
                    const marker = L.marker(e.latlng, { icon: pointIcon }).addTo(mapView);
                    measureMarkersFull.push(marker);
                    measurePointsFull.push(e.latlng);
                    
                    updateMeasureLineFull();
                    
                    const distFull = calculateTotalDistanceFull();
                    if (measurePointsFull.length === 1) {
                         document.getElementById('distanceValueFull').innerHTML = '0.00 <span>กม.</span>';
                    } else {
                        if (distFull < 1) {
                            document.getElementById('distanceValueFull').innerHTML = `${(distFull * 1000).toFixed(0)} <span>เมตร</span>`;
                        } else {
                            document.getElementById('distanceValueFull').innerHTML = `${distFull.toFixed(2)} <span>กม.</span>`;
                        }
                    }
                });
            }
            // Update markers whenever map view is shown
            updateMapViewMarkers();
        }

        // Custom marker icon generator
        function createCustomIcon(team) {
            let gradient = 'linear-gradient(135deg, #0ea5e9, #06b6d4)'; // Default Blue
            
            // Define gradients based on team
            const gradients = {
                'A': 'linear-gradient(135deg, #ef4444, #dc2626)', // Red
                'B': 'linear-gradient(135deg, #10b981, #059669)', // Green
                'C': 'linear-gradient(135deg, #f59e0b, #d97706)', // Orange
                'D': 'linear-gradient(135deg, #0ea5e9, #0284c7)', // Blue
                'E': 'linear-gradient(135deg, #8b5cf6, #7c3aed)'  // Purple
            };

            if (gradients[team]) {
                gradient = gradients[team];
            }

            return L.divIcon({
                className: 'custom-marker',
                html: `<div style="background: ${gradient}; width: 32px; height: 32px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3);"></div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 32]
            });
        }

        // Sample check-in locations
        const locations = [
            { lat: 13.7466, lng: 100.5392, name: 'อรุณี วงศ์ประเสริฐ', place: 'Central World', team: 'A' },
            { lat: 13.7460, lng: 100.5347, name: 'สมชาย ใจดี', place: 'Siam Paragon', team: 'B' },
            { lat: 13.7311, lng: 100.5696, name: 'วรรณา สุขสันต์', place: 'EmQuartier', team: 'C' },
            { lat: 13.7378, lng: 100.5603, name: 'ประเสริฐ รุ่งเรือง', place: 'Terminal 21', team: 'D' },
            { lat: 13.7268, lng: 100.5100, name: 'มานี มีศรี', place: 'ICONSIAM', team: 'E' }
        ];

        // Store markers
        const markers = [];

        // Add markers
        locations.forEach((loc, index) => {
            const marker = L.marker([loc.lat, loc.lng], { icon: createCustomIcon(loc.team) })
                .bindPopup(`
                    <div style="font-family: 'Prompt', sans-serif; padding: 5px;">
                        <strong style="font-size: 1rem;">${loc.name}</strong> <span style="font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; background: #f1f5f9; color: #64748b;">Team ${loc.team}</span><br>
                        <span style="color: #64748b;"><i class="fas fa-location-dot"></i> ${loc.place}</span>
                    </div>
                `)
                .addTo(map);
            markers.push(marker);
        });

        // Function to update markers on Map View based on filter
        function updateMapViewMarkers() {
            if (!mapView) return;

            // Clear existing layers
            mapViewLayers.forEach(layer => mapView.removeLayer(layer));
            mapViewLayers = [];
            
            const filterTeam = document.getElementById('mapViewTeamFilter').value;

            locations.forEach(loc => {
                if (filterTeam === 'all' || loc.team === filterTeam) {
                    const marker = L.marker([loc.lat, loc.lng], { icon: createCustomIcon(loc.team) })
                        .bindPopup(`
                            <div style="font-family: 'Prompt', sans-serif; padding: 5px;">
                                <strong style="font-size: 1rem;">${loc.name}</strong> <span style="font-size: 0.8rem; padding: 2px 6px; border-radius: 4px; background: #f1f5f9; color: #64748b;">Team ${loc.team}</span><br>
                                <span style="color: #64748b;"><i class="fas fa-location-dot"></i> ${loc.place}</span>
                            </div>
                        `)
                        .addTo(mapView);
                    mapViewLayers.push(marker);
                }
            });
        }
        
        // Filter function for Map View
        function filterMapView() {
             updateMapViewMarkers();
        }

        // Initially hide marker at index 3 (matching unchecked toggle)
        map.removeLayer(markers[3]);

        // Toggle marker visibility
        function toggleMarker(index, visible) {
            if (visible) {
                markers[index].addTo(map);
            } else {
                map.removeLayer(markers[index]);
            }
        }

        // Filter Panel Toggle
        function toggleFilter() {
            const panel = document.getElementById('filterPanel');
            panel.classList.toggle('active');
        }

        // Page Navigation
        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(page => {
                page.style.display = 'none';
            });
            
            // Show selected page
            const selectedPage = document.getElementById('page-' + pageName);
            if (selectedPage) {
                selectedPage.style.display = 'block';
                // Initialize map if switching to mapview
                if (pageName === 'mapview') {
                    setTimeout(() => {
                        initMapView();
                        mapView.invalidateSize();
                    }, 100);
                } else if (pageName === 'dashboard') {
                    setTimeout(() => {
                        map.invalidateSize();
                    }, 100);
                }
            }
            
            // Update nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
                if (item.dataset.page === pageName) {
                    item.classList.add('active');
                }
            });
        }

        // Apply Filters (mockup - just shows alert)
        function applyFilters() {
            const team = document.getElementById('filterTeam').value;
            const zone = document.getElementById('filterZone').value;
            const branch = document.getElementById('filterBranch').value;
            const date = document.getElementById('filterDate').value;
            
            alert(`กำลังกรองข้อมูล:\n- ทีม: ${team}\n- เขต: ${zone}\n- สาขา: ${branch}\n- วันที่: ${date}`);
        }

        // Distance Measurement - Multi-point like Google Maps
        let measureMode = false;
        let measurePoints = [];
        let measureMarkers = [];
        let measureLine = null;
        let totalDistance = 0;

        function toggleMeasure() {
            measureMode = !measureMode;
            const btn = document.getElementById('measureBtn');
            const panel = document.getElementById('distancePanel');
            
            if (measureMode) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-times"></i> ยกเลิก';
                panel.classList.add('active');
                document.getElementById('distanceInfo').innerHTML = 'คลิกเพื่อเพิ่มจุด <button onclick="clearMeasurement()" style="background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; cursor: pointer; margin-left: 8px;"><i class="fas fa-trash"></i> ล้าง</button>';
                document.getElementById('distanceValue').innerHTML = '0.00 <span>กม.</span>';
                totalDistance = 0;
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="fas fa-ruler"></i> วัดระยะ';
                panel.classList.remove('active');
                clearMeasurement();
            }
        }

        function clearMeasurement() {
            measurePoints = [];
            measureMarkers.forEach(m => map.removeLayer(m));
            measureMarkers = [];
            if (measureLine) {
                map.removeLayer(measureLine);
                measureLine = null;
            }
            totalDistance = 0;
            if (measureMode) {
                document.getElementById('distanceValue').innerHTML = '0.00 <span>กม.</span>';
            }
        }

        // Calculate distance using Haversine formula
        function calculateDistance(lat1, lng1, lat2, lng2) {
            const R = 6371; // Earth radius in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLng/2) * Math.sin(dLng/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        }

        // Calculate total distance for all points
        function calculateTotalDistance() {
            let total = 0;
            for (let i = 1; i < measurePoints.length; i++) {
                total += calculateDistance(
                    measurePoints[i-1].lat, measurePoints[i-1].lng,
                    measurePoints[i].lat, measurePoints[i].lng
                );
            }
            return total;
        }

        // Update the polyline with all points
        function updateMeasureLine() {
            if (measureLine) {
                map.removeLayer(measureLine);
            }
            if (measurePoints.length >= 2) {
                measureLine = L.polyline(measurePoints, {
                    color: '#ef4444',
                    weight: 3,
                    dashArray: '10, 10'
                }).addTo(map);
            }
        }

        // Map click handler for distance measurement
        map.on('click', function(e) {
            if (!measureMode) return;
            
            // Create marker with point number
            const pointNum = measurePoints.length + 1;
            const pointIcon = L.divIcon({
                className: 'measure-point',
                html: `<div style="background: #ef4444; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-size: 11px; font-weight: bold;">${pointNum}</div>`,
                iconSize: [24, 24],
                iconAnchor: [12, 12]
            });
            
            const marker = L.marker(e.latlng, { icon: pointIcon }).addTo(map);
            measureMarkers.push(marker);
            measurePoints.push(e.latlng);
            
            // Update the line
            updateMeasureLine();
            
            // Calculate and show total distance
            totalDistance = calculateTotalDistance();
            
            if (measurePoints.length === 1) {
                document.getElementById('distanceValue').innerHTML = '0.00 <span>กม.</span>';
            } else {
                // Show distance appropriately
                if (totalDistance < 1) {
                    // Show in meters if less than 1 km
                    document.getElementById('distanceValue').innerHTML = `${(totalDistance * 1000).toFixed(0)} <span>เมตร</span>`;
                } else {
                    document.getElementById('distanceValue').innerHTML = `${totalDistance.toFixed(2)} <span>กม.</span>`;
                }
            }
        });

        // -------------------------
        // Map View Measurement Tool
        // -------------------------
        let measureModeFull = false;
        let measurePointsFull = [];
        let measureMarkersFull = [];
        let measureLineFull = null;

        function toggleMeasureFull() {
            measureModeFull = !measureModeFull;
            const btn = document.getElementById('measureBtnFull');
            const panel = document.getElementById('distancePanelFull');
            
            if (measureModeFull) {
                btn.classList.add('active');
                btn.innerHTML = '<i class="fas fa-times"></i> ยกเลิก';
                panel.classList.add('active');
                document.getElementById('distanceInfoFull').innerHTML = 'คลิกเพื่อเพิ่มจุด <button onclick="clearMeasurementFull()" style="background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; font-size: 0.75rem; cursor: pointer; margin-left: 8px;"><i class="fas fa-trash"></i> ล้าง</button>';
                document.getElementById('distanceValueFull').innerHTML = '0.00 <span>กม.</span>';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '<i class="fas fa-ruler"></i> วัดระยะ';
                panel.classList.remove('active');
                clearMeasurementFull();
            }
        }

        function clearMeasurementFull() {
            measurePointsFull = [];
            measureMarkersFull.forEach(m => mapView.removeLayer(m));
            measureMarkersFull = [];
            if (measureLineFull) {
                mapView.removeLayer(measureLineFull);
                measureLineFull = null;
            }
            if (measureModeFull) {
                document.getElementById('distanceValueFull').innerHTML = '0.00 <span>กม.</span>';
            }
        }

        function calculateTotalDistanceFull() {
            let total = 0;
            for (let i = 1; i < measurePointsFull.length; i++) {
                total += calculateDistance(
                    measurePointsFull[i-1].lat, measurePointsFull[i-1].lng,
                    measurePointsFull[i].lat, measurePointsFull[i].lng
                );
            }
            return total;
        }

        function updateMeasureLineFull() {
            if (measureLineFull) {
                mapView.removeLayer(measureLineFull);
            }
            if (measurePointsFull.length >= 2) {
                measureLineFull = L.polyline(measurePointsFull, {
                    color: '#ef4444',
                    weight: 3,
                    dashArray: '10, 10'
                }).addTo(mapView);
            }
        }
