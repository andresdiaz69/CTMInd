# Table: CierreEjercicioTMP

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCierreTipos | nvarchar | NO |
| PkAñoCierre | nvarchar | NO |
| PkCierreEjercicioTMP_Iden | int | NO |
| FkContCtas | nvarchar | NO |
| FkContCtas_Cierre | nvarchar | NO |
| TerceroBanco | int | YES |
| NombreTercero | nvarchar | YES |
| FkTerceros_Apertura | int | YES |
| NombreTerceroApertura | nvarchar | YES |
| FkCentros | smallint | NO |
| FkDepartamentos | nvarchar | YES |
| FkSecciones | int | YES |
| FkVentaCanales | nvarchar | YES |
| FkCompraCanales | nvarchar | YES |
| FkMarcas | smallint | YES |
| FkGamas | smallint | YES |
| FkMR | nvarchar | YES |
| FkClasificacion1 | nvarchar | YES |
| FkManoObraTipos | smallint | YES |
| FkTarifas | tinyint | YES |
| TotalDebe | decimal | NO |
| TotalHaber | decimal | NO |
| TotalDebeContravalor | decimal | NO |
| TotalHaberContravalor | decimal | NO |
| NombreCuenta | nvarchar | NO |
| NombreCuentaCierre | nvarchar | NO |
| TipoCalculo | nvarchar | NO |
| NivelDesglose | tinyint | NO |
| NivelDesgloseCierre | tinyint | NO |
| NombreSeccion | nvarchar | YES |
| NombreCentro | nvarchar | YES |
| NombreDepartamento | nvarchar | YES |
| NombreMarca | nvarchar | YES |
| NombreGama | nvarchar | YES |
| DecripcionMR | nvarchar | YES |
| DescripcionClasificacion1 | nvarchar | YES |
| DescripcionManoObraTipos | nvarchar | YES |
| DescripcionVentaCanales | nvarchar | YES |
| DescripcionCompraCanales | nvarchar | YES |
| NombreTerceroBanco | nvarchar | YES |
| FkMonedas | smallint | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkTerceros | int | YES |
| Apellido1 | nvarchar | YES |
| Apellido2 | nvarchar | YES |
| FkMonedas_Movimiento | smallint | YES |
