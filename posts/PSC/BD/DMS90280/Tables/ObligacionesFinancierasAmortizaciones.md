# Table: ObligacionesFinancierasAmortizaciones

| Column Name | Data Type | Nullable |
|-------------|-----------|----------|
| PkFkEmpresas | smallint | NO |
| PkFkObligacionesFinancierasTipos | tinyint | NO |
| PkFkObligacionesFinancieras | smallint | NO |
| PkObligacionesFinancierasAmortizaciones_Iden | smallint | NO |
| TipoMovimientoAmortizacion | tinyint | NO |
| Fecha | datetime | YES |
| ImporteInteres | decimal | YES |
| FechaPagoInteres | datetime | YES |
| ImporteAmortizar | decimal | YES |
| ImportePendiente | decimal | YES |
| Cuota | decimal | YES |
| ImporteAmortizado | decimal | YES |
| ImporteIVA | decimal | YES |
| ImporteIRPF | decimal | YES |
| FkAñoAsiento | nvarchar | YES |
| FkAsientos | int | YES |
| UserMod | smallint | NO |
| HostMod | nvarchar | NO |
| VersionFila | tinyint | NO |
| FechaMod | datetime | NO |
| CreditoDisponible | decimal | YES |
| CancelacionParcialTipos | tinyint | YES |
