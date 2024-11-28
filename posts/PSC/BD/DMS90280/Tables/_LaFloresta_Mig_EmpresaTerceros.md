# Table: _LaFloresta_Mig_EmpresaTerceros

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkTerceros | int | NO |
| NoDistribuirDatosLPD | bit | YES |
| FechaBaja | smalldatetime | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| CreditoRecambiosAsegurado | bit | NO |
| FechaMod | smalldatetime | NO |
| FacturaElectronica | bit | NO |
| FacturacionAgrupada | bit | NO |
| AdmiteTirea | bit | NO |
| EntidadTirea | nvarchar | YES |
| FechaImpresionRobinson | smalldatetime | YES |
| FechaImpresionRobinsonVN | smalldatetime | YES |
| NoConsentimientoGlobalComunicacion | bit | YES |
| NoConsentimientoComunicacionCorreoPostal | bit | YES |
| NoConsentimientoComunicacionCorreoElectronico | bit | YES |
| NoConsentimientoComunicacionSMS | bit | YES |
| NoConsentimientoComunicacionFax | bit | YES |
| NoConsentimientoComunicacionTelefono | bit | YES |
| BloquearPagos | bit | NO |
| TerceroAutoFactura | bit | NO |
| AutorizarFacturaAutomaticamente | bit | NO |
| NoRequierePedido | bit | NO |
| NoRequiereAutorizarPedido | bit | NO |
| FkResumenTipos | tinyint | YES |
| TerceroAutoFacturaManual | bit | NO |
| TerceroIncongruente | bit | NO |
| GeneraSAFT | bit | NO |
| PermiteAutoFacturaAtipica | bit | NO |
| BloquearComoCliente | bit | NO |
| BloquearComoProveedor | bit | NO |
