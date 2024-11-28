# Table: TallerPagoTipos

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkTallerPagoTipos | nvarchar | NO |
| Descripcion | nvarchar | NO |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaBaja | datetime | YES |
| FkSerieTipos_AlbaranCargo | nvarchar | YES |
| FkSerieTipos_AlbaranAbono | nvarchar | YES |
| FkSerieTipos_FacturaCargo | nvarchar | YES |
| FkSerieTipos_FacturaAbono | nvarchar | YES |
| Precarga | bit | NO |
| DatosFacturaClientes | bit | NO |
| FechaMod | datetime | NO |
| FkSerieTipos_FSCargo | nvarchar | YES |
| FkSerieTipos_FSAbono | nvarchar | YES |
| FkSerieTipos_BoletaCargo | nvarchar | YES |
| FkSerieTipos_BoletaAbono | nvarchar | YES |
| TituloInformeFactura | nvarchar | YES |
| EnvioFactura | bit | NO |
| FkModulos | nvarchar | YES |
| FkInformes | smallint | YES |
| FkDocumentoEmitidoTipos | smallint | YES |
