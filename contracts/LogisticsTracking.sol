// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./UserManagement.sol";

contract LogisticsTracking {
    UserManagement public userManagement;

    struct Shipment {
        uint wasteId;
        string status;
        address transporter;
        uint256 updatedAt;
    }

    mapping(uint => Shipment) public shipments;
    
    event ShipmentUpdated(uint wasteId, string status, uint256 updatedAt);

    constructor(address _userManagementAddress) {
        userManagement = UserManagement(_userManagementAddress);
    }

    // Only logistics providers can update shipments
    function updateShipment(uint _wasteId, string memory _status) external {
        require(
            userManagement.getUserRole(msg.sender) == UserManagement.Role.Logistics,
            "Unauthorized: Only logistics providers can update shipments."
        );
        
        shipments[_wasteId] = Shipment({
            wasteId: _wasteId,
            status: _status,
            transporter: msg.sender,
            updatedAt: block.timestamp
        });
        emit ShipmentUpdated(_wasteId, _status, block.timestamp);
    }
}