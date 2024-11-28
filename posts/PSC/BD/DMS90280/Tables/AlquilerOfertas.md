# Table: AlquilerOfertas

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkCentros | smallint | NO |
| PkFkTerceros | int | NO |
| PkAlquilerOfertas_Iden | smallint | NO |
| FkVehiculos | int | NO |
| FkPrestamoTipos | smallint | NO |
| FkAlquilerOfertasEstados | tinyint | NO |
| FechaAlta | datetime | NO |
| FkEmpleados | smallint | NO |
| FechaValidez | datetime | NO |
| FkAlquilerFacturacionPeriodos | tinyint | YES |
| FkAlquilerTarifas | smallint | YES |
| ImporteTotal | decimal | YES |
| PrecioVehiculo_Leasing | decimal | YES |
| PrecioFinanciar_Leasing | decimal | YES |
| InteresPorc_Leasing | decimal | YES |
| Cuotas_Leasing | smallint | YES |
| ImporteEntregaInicial_Leasing | decimal | YES |
| ImporteResidual_Leasing | decimal | YES |
| FkImpuestos_Leasing | nvarchar | YES |
| ImpuestoPorc_Leasing | decimal | YES |
| CuotaPromedio_Leasing | bit | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| FkAlquilerPeriodos | tinyint | YES |
| FkAmortizacionTipos_Leasing | tinyint | YES |
| ImporteCosteTotal | decimal | YES |
